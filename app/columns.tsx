"use client";

import { Button } from "@/components/ui/button";
import { Channels } from "@/lib/db";
import { getRelativeTimeString, numberWithCommas } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Channels>[] = [
  {
    accessorKey: "name",
    size: 150,

    filterFn: (row, columnId, filterValue) => {
      return (
        (row.getValue("id") as string)!
          .toLowerCase()
          .includes(filterValue?.toLowerCase()) ||
        (row.getValue("name") as string)!
          .toLowerCase()
          .includes(filterValue?.toLowerCase())
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={{ query: { channel: row.getValue("id") } }}
          className="break-all"
        >
          <div
            key={row.getValue("id")}
            className="cursor-pointer flex flex-row gap-2 items-center"
          >
            <div className="w-[36px] h-[36px] flex-shrink-0">
              <div className="w-[36px] h-[36px] absolute">
                <Image
                  className="rounded-full"
                  src={row.getValue("image_url")}
                  sizes="(max-width: 768px) 36px, 36px"
                  quality={75}
                  alt={row.id}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{row.getValue("name")}</div>
              <div className="text-violet-500 italic">/{row.id}</div>
            </div>
          </div>
        </Link>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          size={"sm"}
          className="px-0 py-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    size: 120,

    accessorKey: "created_at",
    cell: ({ row }) => {
      return (
        <div key={row.getValue("id")} className=" text-slate-400">
          {getRelativeTimeString(Number(row.getValue("created_at")) * 1000)}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          size={"sm"}
          className="px-0 py-0 text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    size: 100,
    accessorKey: "follower_count",
    cell: ({ row }) => {
      return (
        <div className=" text-slate-400">
          {numberWithCommas(row.getValue("follower_count"))}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          size={"sm"}
          className="px-0 py-0 text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Followers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hosts",
    header: () => null,
    size: 300,
    cell: ({ row }) => {
      return (
        <div
          key={row.getValue("id")}
          //   onClick={() => setOpenChannelModal(row)}
          className="cursor-pointer flex flex-row gap-2 items-center"
        >
          {(row.getValue("hosts") as any[])?.map((host) => {
            return (
              <a
                href={`https://warpcast.com/${host.username}`}
                target="_blank"
                rel="noreferer noopener"
              >
                <div className="cursor-pointer flex flex-row gap-2 items-center">
                  <div
                    className="w-[36px] h-[36px] flex-shrink-0"
                    key={host.fid}
                  >
                    <div className="w-[36px] h-[36px] absolute">
                      <Image
                        className="rounded-full"
                        src={
                          host.pfp_url ||
                          "https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,w=144/https%3A%2F%2Fwarpcast.com%2Favatar.png"
                        }
                        sizes="(max-width: 768px) 36px, 36px"
                        quality={75}
                        alt={host.fid}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{host.display_name}</div>
                    <div className="text-violet-500 italic">
                      @{host.username}
                    </div>
                    <div className="text-violet-500 italic">
                      {numberWithCommas(host.follower_count)} Followers
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    cell: ({ row }) => {
      return null;
    },
    header: () => null,
    size: 0,
  },
  {
    accessorKey: "image_url",
    cell: ({ row }) => {
      return null;
    },
    size: 0,

    header: () => null,
  },
  {
    accessorKey: "id",
    cell: ({ row }) => {
      return null;
    },
    size: 0,

    header: () => null,
  },
];
