import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/providers/providers';

export const metadata: Metadata = {
  title: 'HD Automóveis',
  description: 'Modern car dealership platform.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
