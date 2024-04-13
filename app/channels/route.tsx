import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result =
      await sql`select name, id, created_at, follower_count, hosts, name, image_url from channels`;
    // const channels = await db.selectFrom("channels").selectAll().execute();
    return NextResponse.json({ channels: result.rows || [] });
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
