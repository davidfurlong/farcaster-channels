import type { ColumnType } from "kysely";

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, number | string, number | string>;

export interface Channels {
  created_at: Numeric | null;
  description: string | null;
  follower_count: Numeric | null;
  hosts: Json | null;
  id: string | null;
  image_url: string | null;
  lead: Json | null;
  name: string | null;
  object: string | null;
  parent_url: string | null;
  url: string;
}

export interface DB {
  channels: Channels;
}
