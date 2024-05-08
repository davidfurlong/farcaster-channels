"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { Channels } from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function Results() {
  const [results, setResults] = useState<Channels[]>([]);
  const [openChannelModal, setOpenChannelModal] = useState<Channels | null>(
    null
  );
  const searchParams = useSearchParams();
  const selectedChannelId = searchParams.get("channel");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (selectedChannelId) {
      const selectedChannel = results.find(
        (channel) => channel.id === selectedChannelId
      );
      if (selectedChannel) setOpenChannelModal(selectedChannel);
      router.push(`${pathname}`);
    }
  }, [selectedChannelId]);

  useEffect(() => {
    async function fetchAsync() {
      const newResults = await fetch(`/channels`);
      try {
        const newResultsJson = await newResults.json();

        setResults(
          (newResultsJson.channels as Channels[]).sort((a, b) =>
            a.id! > b.id! ? 1 : -1
          )
        );
      } catch (err) {
        console.error(err);
      }
    }

    fetchAsync();
  }, []);

  return (
    <div className="flex flex-col">
      <Dialog
        open={!!openChannelModal}
        onOpenChange={(open) => {
          if (!open) setOpenChannelModal(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span>{openChannelModal?.name}</span>
            </DialogTitle>
            <DialogDescription>
              {openChannelModal ? (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-violet-600 italic">
                    /{openChannelModal.id}
                  </span>
                  <span className="italic">{openChannelModal.description}</span>
                  <div className="py-2">
                    <hr />
                  </div>
                  <span className="font-bold">Open in</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://warpcast.com/~/channel/${openChannelModal.id}`}
                    >
                      Warpcast
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://www.supercast.xyz/channel/${openChannelModal.id}`}
                    >
                      Supercast
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://opencast.stephancill.co.za/topic?url=${openChannelModal.url}`}
                    >
                      Opencast
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://u3.xyz/social/channel/${openChannelModal.id}`}
                    >
                      U3
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://farcord.com/channels/${openChannelModal.id}`}
                    >
                      Farcord
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-[140px] justify-start"
                    asChild
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferer"
                      href={`https://far.quest/channel/${openChannelModal.id}`}
                    >
                      Cast by far.quest
                    </a>
                  </Button>
                </div>
              ) : null}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="gap-2 flex flex-col sticky top-0 py-2 bg-white dark:bg-black z-10 border-b border-b-violet-100 dark:border-b-violet-800 px-2">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={
              "https://raw.githubusercontent.com/vrypan/farcaster-brand/main/icons/icon-rounded/purple-white.svg"
            }
            alt="farcaster"
            width={28}
            height={28}
          />
          <h1 className="text-xl dark:text-violet-100">farcaster channels</h1>
          <a
            href="https://github.com/davidfurlong/farcaster-channels"
            rel="noopener noreferer"
            className="ml-auto"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
      <div className="min-h-[calc(100vh-101px)] border-b">
        {results.length === 0 ? (
          <div className="px-2 py-2">Loading thousands of channels...</div>
        ) : (
          <DataTable columns={columns} data={results} />
        )}
      </div>
      <div className="p-2">
        This site is MIT Licensed Open Source software, made by{" "}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://www.davidfurlong.me"
        >
          @df
        </a>
      </div>
    </div>
  );
}
