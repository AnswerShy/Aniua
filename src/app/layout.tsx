import { Roboto_Condensed } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading/LoadingComponent';
import { i18n } from '@/utils/customUtils';
import { SearchProvider } from '@/context/SearchContext';

const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aniua',
  description: i18n.t('description.home'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${roboto.className} antialiased`}>
        <SearchProvider>
          <Loading />
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
