interface AnimeListInterface {
  id?: string;
  slug: string;
  title: string;
  reiting: {
    likes: number;
    dislikes: number;
  };
  is_default: boolean;
  date?: Date;
  titles_count?: number;
  titles?: [];
  is_pagenated?: boolean;
  next_url?: any;
  prev_url?: any;
}

interface UserSettings {
  theme?: 'light' | 'dark';
  chat_size?: string;
  hide_header?: boolean;
}

interface UserProfileInterface {
  id?: number;
  username?: string;
  avatar?: string;
  description?: string;
  website?: string;
  github?: string;
  twitter?: string;
  telegram?: string;
  home?: string;
  first_name?: string;
  last_name?: string;
  anime_name?: string;
  money?: number;
  verified?: boolean;
  date_joined?: Date;
  last_login?: Date;
  is_online?: boolean;
  is_active?: boolean;
  last_activity?: Date;
  xp?: number;
  css?: string;
  comments_count?: number;
  reviews_count?: number;
  achievements?: [string];
  anime_lists?: AnimeListInterface[];
  success?: boolean;
  referer?: null;
  settings?: UserSettings;
}
