import { Roboto_Condensed } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import { i18n } from '@/utils/customUtils';
import { Toaster } from 'react-hot-toast';
import { ViewTransitions } from 'next-view-transitions';

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
  modal,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html>
      <ViewTransitions>
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
          {modal}
          <main>{children}</main>
        </body>
      </ViewTransitions>
    </html>
  );
}
