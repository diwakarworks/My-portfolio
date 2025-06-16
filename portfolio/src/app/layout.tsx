import './globals.css';
import type { Metadata,Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Diwakar's Portfolio",
  description: 'Mind-blowing dev portfolio by Diwakar',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={inter.className}>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
