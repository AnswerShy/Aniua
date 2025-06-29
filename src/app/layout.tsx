import { Roboto_Condensed } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import { getTranslatedText } from '@/utils';
import { Toaster } from 'react-hot-toast';
import sitemeta from '@/constants/site-metadata';

const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: sitemeta.title,
  keywords: sitemeta.keywords,
  description: getTranslatedText('description.home'),
  metadataBase: sitemeta.url,
  openGraph: {
    url: sitemeta.url,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${roboto.className} antialiased`}>
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--03dp)',
              color: '#fff',
            },
          }}
        />
        <Header />

        <main>
          {children}
          {modal}
        </main>
      </body>
    </html>
  );
}
