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