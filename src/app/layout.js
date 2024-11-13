// import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Head from 'next/head'; // Import Head component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sparktivity',
  description: 'An activity management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="manifest" href="/manifest.json" /> {/* Add manifest link */}
        {/* You can also add other meta tags here */}
      </Head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <ToastContainer />
      </body>
    </html>
  );
}
