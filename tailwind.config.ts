import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        textCol: 'var(--textColor)',
        c01dp: 'var(--01dp)',
        transparent01dp: 'var(--t01dp)',
      },
      height: {
        'calc-screen-minus-4rem': 'calc(100svh - 4rem)',
      },
    },
  },
  plugins: [],
} satisfies Config;
