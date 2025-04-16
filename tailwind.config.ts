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
        c01dp: 'var(--01dp)',
        c02dp: 'var(--02dp)',
        transparent01dp: 'var(--t01dp)',
        transparent00dp: 'var(--t00dp)',
      },
      height: {
        'calc-screen-minus-4rem': 'calc(100svh - 4rem)',
      },
    },
  },
  plugins: [],
} satisfies Config;
