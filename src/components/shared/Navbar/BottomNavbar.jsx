'use client';

import { Button } from '@/components/ui/button';
import { switchToLogin } from '@/store/features/modalSlice';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { IoMdTrendingUp } from 'react-icons/io';
import { LuUser2 } from 'react-icons/lu';
import { PiPlusSquareBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-scroll/modules';
import ActiveLink from '../ActiveLink/ActiveLink';
import AuthModal from '../AllModals/AuthModal';
import MoreSidebar from '../Sidebar/MoreSidebar';
import { getLocalData } from '@/lib/auth/token';

const BottomNavbar = () => {
  const pathname = usePathname();
  // const [token, setToken] = useState('');
  const isActivityPage = pathname.includes('/activity/');


  const token = getLocalData('user')
  console.log(token);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   let storedValue =
  //     typeof window !== 'undefined' &&
  //     window.localStorage.getItem('accessToken');
  //   // if (typeof window !== 'undefined') {
  //   // let storedValue = JSON.parse(window.localStorage.getItem('accessToken'));
  //   setToken(storedValue);

  //   // }
  // }, []);

  const navMenuArray = [
    {
      name: 'Home',
      path: '/',
      icon: <GoHome />,
    },
    {
      name: 'Trending',
      path: '/trending',
      icon: <IoMdTrendingUp />,
    },
    {
      name: 'Post Activity',
      path: '/dashboard/post-activities',
      icon: <PiPlusSquareBold />,
    },
    // {
    //   name: 'Calender',
    //   path: '/my-calendar',
    //   icon: <LuCalendar />,
    // },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden ">
         <div
        className={`flex justify-between  px-4 py-2 border items-center ${isActivityPage || 'hidden'}`}
      >
        <h1 className="text-lg font-semibold">$410</h1>
        <Link
          activeClass="active"
          to="reserve"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <Button>Reserve</Button>
        </Link>
      </div>
      <div
        className={`flex items-center justify-around `}
      >
        {navMenuArray.map((item, idx) => {
          return (
            <ActiveLink
              key={idx}
              href={item.path}
              className="text-[#5A627F]/90 capitalize px-0"
              activeClassName="text-primary capitalize text-sm sm:text-xl px-0"
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm sm:text-xl">{item.icon}</span>
                <h1 className="text-[10px] sm:text-xs font-medium text-nowrap">
                  {item.name}
                </h1>
              </div>
            </ActiveLink>
          );
        })}

        <AuthModal />
        {/* login modal ----- */}
        {!token ? (
          <div
            onClick={() => dispatch(switchToLogin())}
            className="space-y-1 grid place-items-center text-[#5A627F]/90 lg:hidden cursor-pointer"
          >
            <span className="">
              <LuUser2 className="text-xs sm:text-xl" />
            </span>
            <h1 className="font-medium text-[10px] sm:text-xs">Login</h1>
          </div>
        ) : (
          <MoreSidebar />
        )}
      </div>
   
    </div>
  );
};

export default BottomNavbar;
