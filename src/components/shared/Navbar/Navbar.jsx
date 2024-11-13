'use client';

import logo from '@/assets/logo.png';
import Category from '@/components/Pages/Home/Category/Category';
import ActiveLink from '@/components/shared/ActiveLink/ActiveLink';
import navItems from '@/lib/Data/NavData';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsSliders } from 'react-icons/bs';
import FilterModal from '../AllModals/FilterModal/FilterModal';
import LanguageSwitcher from '../Language/LanguageSwitcher';
import ProfileDropDown from './ProfileDropDown';
import SearchFilter from './SearchFilter';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [language, setLanguage] = useState('en');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

 
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the default prompt
      setDeferredPrompt(event); // Save the event
      setIsButtonVisible(true); // Show the custom button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up the event listener
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddToHomeScreen = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Show the install prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    setDeferredPrompt(null); // Clear the saved event
  };


  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setIsTop(window.scrollY > 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // useEffect(() => {
  //   const skiptranslate = document.querySelector('.skiptranslate');
  //   if (skiptranslate) {
  //     const lastChild = skiptranslate.lastChild;
  //     // Check if the last child is a text node and remove it
  //     if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
  //       lastChild.remove();
  //     }
  //   }
  // }, []);

  return (
    <div className={cn('sticky top-0 z-30 hidden lg:block', { '': isTop })}>
      <div className="max-w-[1400px] bg-white pt-4 mx-auto w-full lg:md:px-6 px-4">
        <div className="items-center justify-between hidden lg:flex">
          <Link href="/" className="invisible mr-6 cursor-pointer md:visible">
            <Image src={logo} width={160} alt="logo" />
          </Link>

          <div
            className={cn(
              'transition-all sticky duration-300 ease-in-out opacity-100 ',
              { 'opacity-0 scale-50 -translate-y-full': isTop }
            )}
          >
            {navItems?.map((item, idx) => (
              <ActiveLink
                key={idx}
                href={item.route}
                className="px-4 text-[#5A627F]/90 text-xs sm:text-xs xl:text-sm text-nowrap"
                activeClassName="px-4 font-semibold text-black sm:text-xs xl:text-sm text-nowrap"
              >
                {item.label}
              </ActiveLink>
            ))}
          </div>
       <div>
      {isButtonVisible && (
        <button onClick={handleAddToHomeScreen}>Add to Home Screen</button>
      )}
    </div>
          <div className="flex items-center justify-center gap-5">
            {/* <LanguageSelect setLanguage={setLanguage} /> */}
            <LanguageSwitcher />
            <ProfileDropDown />
          </div>
        </div>

        <div
          className={cn(
            'flex justify-center mb-4 border-[#ddd]  transition-all duration-300 ease-in-out opacity-100 ',
            { 'scale-75 mt-6 -translate-y-20': isTop }
          )}
        >
          <SearchFilter>
            <div
              onClick={() => setOpenModal(true)}
              className="px-6 py-2 bg-white border rounded-lg cursor-pointer border-slate-300 hover:bg-white"
            >
              <div className="flex items-center gap-5">
                <BsSliders className="text-[#091540] text-[26px]" />
                <span>Filters</span>
              </div>
            </div>
          </SearchFilter>
        </div>
      </div>

      <Category
        className={cn('transition-all duration-300 ease-out opacity-100 ', {
          'mt-6 -translate-y-24': isTop,
        })}
      />

      <FilterModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Navbar;
