import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drift x Kamino Dashboard',
  description: 'Real-time trading dashboard for Drift perpetuals and Kamino lending',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
