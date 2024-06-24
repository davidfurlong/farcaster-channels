create table channels (
    url text primary key,
    id text,
    name text,
    description text,
    follower_count numeric,
    object text,
    image_url text,
    created_at numeric,
    parent_url text,
    lead jsonb,
    hosts jsonb,
    UNIQUE(url),
    UNIQUE(id)
);

CREATE INDEX channels_url ON channels (url);
CREATE INDEX channels_id ON channels (id);
CREATE INDEX channels_name ON channels (name);
CREATE INDEX channels_created_at ON channels (created_at);
CREATE INDEX channels_lead_username ON channels((lead->>'username'));
CREATE INDEX channels_lead_display_name ON channels((lead->>'display_name'));
CREATE INDEX channels_hosts_username ON channels((hosts->>'username'));

CREATE INDEX channels_hosts_username_in ON channels(jsonb_path_query_array(hosts, '$.username'));