import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Nanum_Gothic,
  Nanum_Gothic_Coding,
} from 'next/font/google';
import '../styles/vars.css.ts';
import '../styles/global.css.ts';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

import * as styles from './layout.css';

export const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: ['400', '700'], // Nanum Gothic 지원 weight
  display: 'swap',
  variable: '--font-nanum-gothicCoding',
});

export const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'], // Nanum Gothic 지원 weight
  display: 'swap',
  variable: '--font-nanum-gothic',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'Headless Playground',
//   description: 'A headless UI component playground',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))}catch(e){document.documentElement.setAttribute('data-theme','light')}`,
          }}
        />
      </head>
      <body
        className={`${nanumGothic.variable} ${nanumGothicCoding.variable} flex min-h-screen flex-col font-sans antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}
