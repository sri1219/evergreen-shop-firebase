import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import PageLoading from '@/components/PageLoading';

export const metadata: Metadata = {
  title: 'Evergreen Shop',
  description: 'A modern e-commerce shopping application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Suspense fallback={null}>
          <PageLoading />
        </Suspense>
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
