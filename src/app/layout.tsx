import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '@/src/context/ThemeContext';
import { UserProfileProvider } from '../context/UserProfileContext';
import { BookProvider } from '../context/BookContext';
import ProgressBar from './ProgressBar';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata: Metadata = {
  title: 'BooklyTrack – your reading diary and AI assistant',
  description:
    'BooklyTrack is your personal diary for books. Take notes, analyze your reading, and test your knowledge with AI.',
  metadataBase: new URL('https://booklytrack.com'),
  keywords: [
    'books',
    'reading diary',
    'book notes',
    'currently reading',
    'read',
    "reader's diary",
    'AI for books',
    'knowledge check by notes',
    'BooklyTrack',
    'intelligent reading',
    'book analysis',
  ],
  icons: {
    icon: [
      { url: '/icons/favicon_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon_192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icons/favicon_32x32.png',
  },

  openGraph: {
    title: 'BooklyTrack – your reading diary with AI',
    description:
      'Keep a list of books you have read, take notes, and boost your memory by testing yourself on your notes with AI.',
    url: 'https://booklytrack.com',
    siteName: 'BooklyTrack',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BooklyTrack – reading diary',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BooklyTrack – your reading diary with AI',
    description: 'Add books, write notes, and test your knowledge — all in one place.',
    images: ['/og-image.png'],
  },

  category: 'education',
  applicationName: 'BooklyTrack',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full text-base-content">
        <GoogleAnalytics gaId="G-2T8QM142RE" />
        <ThemeProvider>
          <UserProfileProvider>
            <BookProvider>
              <AuthProvider>
                <ProgressBar />
                {children}
              </AuthProvider>
            </BookProvider>
          </UserProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
