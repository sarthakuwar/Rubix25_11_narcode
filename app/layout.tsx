import './globals.css';
import type { Metadata } from 'next';
import { Providers } from "./providers";
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HomeFinder - Find Your Perfect Home',
  description: 'Discover your dream property with our advanced property search system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}