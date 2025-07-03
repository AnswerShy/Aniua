export type setting =
  | {
      way: 'api';
      change: string;
      postbodykey: string;
      label?: string;
      type?: 'text' | 'radio' | 'select';
      options?: string[];
    }
  | {
      way: 'local';
      change: string;
      label?: string;
      type?: 'text' | 'radio' | 'select';
      options?: string[];
    };

type SettingsConfig = Record<string, Record<string, setting>>;

const settingsConfig: SettingsConfig = {
  user: {
    username: {
      way: 'api' as const,
      change: 'store.user.username',
      postbodykey: 'username',
      label: 'username',
    },
    description: {
      way: 'api' as const,
      change: 'store.user.description',
      postbodykey: 'description',
      label: 'description',
    },
    first_name: {
      way: 'api' as const,
      change: 'store.user.first_name',
      postbodykey: 'first_name',
      label: 'first_name',
    },
    last_name: {
      way: 'api' as const,
      change: 'store.user.last_name',
      postbodykey: 'last_name',
      label: 'last_name',
    },
  },
  chat: {
    size_of_message: {
      way: 'local' as const,
      change: 'chat_size',
      options: ['big', 'small'],
      label: 'chat_message_size',
    },
  },
  header: {
    hide_header_on_scroll: {
      way: 'local' as const,
      type: 'radio',
      change: 'hide_header',
      label: 'hide_header_on_scroll',
    },
  },
};

export default settingsConfig;
