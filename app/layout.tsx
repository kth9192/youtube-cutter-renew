import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import classnames from 'classnames';
import Header from '@/app/components/header';
import { SWRProvider } from '@/app/swrProvider';
import Toast from '@/app/components/toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'youtube-cutter',
  description: 'youtube-cutter',
  icons: {
    icon: 'favicon.ico',
  },
  viewport: {
    width: 'ddevice-widthe',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classnames(inter.className, 'bg-[#F3F5F8]')}>
        <SWRProvider>
          <Header />
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}
