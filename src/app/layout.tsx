import type { Metadata } from 'next';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '@/src/context/ThemeContext';
import { UserProfileProvider } from '../context/UserProfileContext';
import { BookProvider } from '../context/BookContext';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const metadata: Metadata = {
  title: 'BooklyTrack',
  description: 'BooklyTrack',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full text-base-content">
        <ThemeProvider>
          <UserProfileProvider>
            <BookProvider>
              <AuthProvider>{children}</AuthProvider>
            </BookProvider>
          </UserProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
