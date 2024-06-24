import { NextResponse } from "next/server";
import { createKysely } from "@vercel/postgres-kysely";
import { DB } from "@/lib/db";

export const maxDuration = 300;

export const dynamic = "force-dynamic";

const db = createKysely<DB>();

export async function GET() {
  console.log("running cache");
  const options = {
    method: "GET",
    headers: { accept: "application/json", api_key: process.env.NEYNAR_API! },
  } as const;

  let channels: any[] = [];
  let cursor = "";

  // fetch all channels
  while (true) {
    const nextPage = await fetch(
      `https://api.neynar.com/v2/farcaster/channel/list?limit=200&cursor=${cursor}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    cursor = nextPage.next.cursor;
    channels.push(...nextPage.channels);
    if (!cursor) break;
  }

  // save channels
  try {
    const mappedChannels = channels.map((channel) => ({
      id: channel.id,
      url: channel.url,
      name: channel.name,
      description: channel.description,
      follower_count: channel.follower_count,
      object: channel.object,
      image_url: channel.image_url,
      created_at: channel.created_at,
      parent_url: channel.parent_url,
      lead: JSON.stringify(channel.lead),
      hosts: JSON.stringify(
        channel.hosts?.map((host: any) => ({
          fid: host.fid,
          display_name: host.display_name,
          username: host.username,
          follower_count: host.follower_count,
          pfp_url: host.pfp_url,
        }))
      ),
    }));

    await Promise.all(
      mappedChannels.map((c) =>
        db
          .insertInto("channels")
          .values(c)
          .onConflict((oc) => oc.column("id").doUpdateSet((eb) => c))
          .execute()
      )
    );

    console.log("cache success");
    return NextResponse.json({ channels });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
