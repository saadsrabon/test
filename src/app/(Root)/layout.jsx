'use client';

import Footer from '@/components/shared/Footer/Footer';
import LocationTracker from '@/components/shared/Location/LocationTracker';
import BottomNavbar from '@/components/shared/Navbar/BottomNavbar';
import Navbar from '@/components/shared/Navbar/Navbar';
import SearchFilterMobile from '@/components/shared/Navbar/SearchFilterMobile';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import ReduxWrapper from '../../../provider/redux/ReduxWrapper';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }) => {
  // const [language, setLanguage] = useState('en');
  // Function to initialize Google Translate
  // new

  return (
    <ReduxWrapper>
      <html lang="en">
        <head>
          <title>Sparktivity</title>
          {/* Google Translate Script will be appended dynamically */}
        </head>
        <body className={inter.className}>
          <Navbar /> {/* Adjus as needed */}
          <SearchFilterMobile />
          <BottomNavbar />
          {children}
          <Footer />
          <Toaster />
          <LocationTracker />
          {/* Google Translate Element */}
          {/* <div id="google_translate_element"></div> */}
        </body>
      </html>
    </ReduxWrapper>
  );
};

export default RootLayout;
