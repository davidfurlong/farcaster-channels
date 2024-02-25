"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
} from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Channel } from "./types";

export function Results() {
  const [results, setResults] = useState<Channel[]>([]);
  const [openChannelModal, setOpenChannelModal] = useState<Channel | null>(
    null
  );
  
  useEffect(() => {
    async function fetchAsync() {
      const newResults = await fetch(
        `https://api.modprotocol.org/api/farcaster/channels/v2?hideVirtualChannels=true&q=`
      );
      try {
        const newResultsJson = await newResults.json();

        setResults(
          (newResultsJson.channels as Channel[]).sort((a, b) =>
            a.id > b.id ? 1 : -1
          )
        );
      } catch (err) {
        console.error(err);
      }
    }

    fetchAsync();
  }, []);

  const dateObj = openChannelModal ? new Date(openChannelModal.created_at * 1000) : null

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
                  <span className="text-violet-600 italic">created: {dateObj?.toLocaleDateString()}</span>
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
      <div className="min-h-screen px-2 w-full md:w-4/5 md:mx-8 justify-items-center">
        <DataTable data={results} onClickAction={setOpenChannelModal} />
      </div>
      <div className="p-2">
        Powered by{" "}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://www.modprotocol.org"
        >
          Mod
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://www.neynar.com"
        >
          Neynar
        </a>
        , made by{" "}
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
