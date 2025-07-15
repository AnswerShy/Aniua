import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        textCol: 'var(--textColor)',
        textSemiCol: 'var(--textSemiColor)',
        background: 'var(--background)',
        c01dp: 'var(--front-950)',
        c02dp: 'var(--front-900)',
        transparent01dp: 'var(--front-transparent-950)',
        transparent00dp: 'var(--front-transparent-1000)',
      },
      height: {
        'calc-screen-minus-4rem': 'calc(100svh - 4rem)',
      },
    },
  },
  plugins: [],
} satisfies Config;
