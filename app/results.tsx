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
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdownMenu";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
} from "lucide-react";
import { alphaAscendingSortMethod, alphaDescendingSortMethod, createdAtNewestFirstSortMethod, createdAtOldestFirstSortMethod } from "@/lib/sortMethods";

export type Channel = {
  id: string;
  url: string;
  name: string;
  description: string;
  object: "channel";
  image_url: string;
  created_at: number;
  parent_url: string;
  lead: {
    object: "user";
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
    profile: {
      bio: {
        text: string;
      };
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    active_status: "active" | "inactive";
  };
};

export function Results() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Channel[]>([]);
  const [filteredResults, setFilteredResults] = useState<Channel[]>([]);
  const [sortMethod, setSortMethod] = useState('alpha-asc');
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

  useEffect(() => {
    const sortMethodObj = sortMethod === 'alpha-asc' ? alphaAscendingSortMethod :
      sortMethod === 'alpha-desc' ? alphaDescendingSortMethod :
      sortMethod === 'date-asc' ? createdAtNewestFirstSortMethod :
      createdAtOldestFirstSortMethod;

    const sortedResults = 
      (sortMethodObj.attribute === 'created_at') ?
        results.sort((a, b) =>
          (a.created_at > b.created_at ? 1 : -1 ) * Math.sign(sortMethodObj.direction)
        ) :
        results.sort((a, b) =>
          (a.id > b.id ? 1 : -1) * Math.sign(sortMethodObj.direction)
        );

    setFilteredResults(sortedResults.filter((result) => {
      if (!q) return true;
      return result.name.includes(q) || result.id.includes(q);
    }));
        
  }, [q, results, sortMethod])

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
            href="https://github.com/artlu99/farcaster-channels"
            rel="noopener noreferer"
            className="ml-auto"
          >
            <GithubIcon />
          </a>
        </div>
        <div className="flex no-wrap">
          <input
            autoFocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-[400px] ring-violet-500 focus:ring-1 outline-none max-w-full bg-violet-50 border border-violet-200 text-violet-900 text-sm rounded focus:border-violet-300 block p-2 dark:bg-violet-950 dark:border-violet-600 dark:placeholder-violet-400 dark:text-violet-300"
            placeholder={`Search ${
              results.length ? `${results.length} ` : ""
            }channels`}
          />
          <DropdownMenuContent className="w-60" sideOffset={5} onSelect={() => setSortMethod}>
            <DropdownMenuLabel className="DropdownMenuLabel">Sort by...</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sortMethod} onValueChange={setSortMethod}>
              <DropdownMenuRadioItem className="DropdownMenuRadioItem" value="alpha-asc">Alphabetical, A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="DropdownMenuRadioItem" value="alpha-desc">Alphabetical, Z-A</DropdownMenuRadioItem>
              <DropdownMenuSeparator className="h-0.5 bg-gray-500 m-0.25"  />
              <DropdownMenuRadioItem className="DropdownMenuRadioItem" value="date-new">Date, Newest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="DropdownMenuRadioItem" value="date-old">Date, Oldest First, A-Z</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </div>
      </div>
      <div className="min-h-screen">
        {results.length === 0 ? (
          <div className="px-2 py-2">Loading channels...</div>
        ) : filteredResults.length === 0 ? (
          <div className="px-2 py-2">No results</div>
        ) : null}
        {filteredResults.map((result, i) => {
          return (
            <div
              key={result.id}
              onClick={() => setOpenChannelModal(result)}
              className="cursor-pointer flex flex-row gap-2 hover:bg-white dark:hover:bg-black items-center border-b py-2 border-b-violet-100 dark:border-violet-950 px-2"
            >
              <div className="w-[36px] h-[36px] flex-shrink-0">
                <div className="w-[36px] h-[36px] absolute">
                  <Image
                    className="rounded-full"
                    src={result.image_url}
                    sizes="(max-width: 768px) 36px, 36px"
                    priority={i < 30}
                    quality={75}
                    alt={result.id}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{result.name}</div>
                <div className="text-violet-500 italic">/{result.id}</div>
                {/* <div className="dark:text-violet-600 italic text-xs">{result.description}</div> */}
              </div>
            </div>
        )})}
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
