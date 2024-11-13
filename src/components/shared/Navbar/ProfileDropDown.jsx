'use client';

import avatar from '@/assets/avatar.jpg';
import { clearTokens } from '@/lib/auth/token';
import { DropDownData } from '@/lib/Data/DropDownData';
import { switchToLogin, switchToRegister } from '@/store/features/modalSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa6';
import { IoIosMenu, IoIosUnlock } from 'react-icons/io';
import { TbPhoneCall } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import AuthModal from '../AllModals/AuthModal';
import Cookies from 'js-cookie';
import { logout } from '@/store/features/authSlice';
import { useToast } from '@/components/ui/use-toast';

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const dropDownRef = useRef(null);
  const { toast } = useToast();
  

  const dispatch = useDispatch();

  // const items = [
  //   {
  //     name: 'My Profile',
  //     path: '/my-profile',
  //     icon: <ImProfile />,
  //   },
  //   {
  //     name: 'Dashboard',
  //     path: '/dashboard',
  //     icon: <LuLayoutDashboard />,
  //   },
  //   {
  //     name: 'Post your activity',
  //     path: '/dashboard/post-activities',
  //     icon: <BsPersonWorkspace />,
  //   },
  //   {
  //     name: 'My Favorites',
  //     path: '/my-favorites',
  //     icon: <FaHeart />,
  //   },
  //   {
  //     name: 'My Calendar',
  //     path: '/my-calendar',
  //     icon: <SlCalender />,
  //   },
  //   {
  //     name: 'FAQ',
  //     path: '/faq',
  //     icon: <FaQuestion />,
  //   },
  //   {
  //     name: 'Help Center',
  //     path: '/contact-us',
  //     icon: <TbPhoneCall />,
  //   },
  // ];

  // let storedValue = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('token'));
  let storedValue = Cookies.get('accessToken') || null;

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    // let storedValue = JSON.parse(window.localStorage.getItem('accessToken'));
    setToken(storedValue);
    // }
  }, [open, storedValue]);

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);
  return (
    <div ref={dropDownRef} className="relative text-black">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-6 p-2 border rounded-full"
      >
        <IoIosMenu className="text-[30px]" />
        <div>
          <div>
            <Image
              className="rounded-full size-[35px]"
              src={avatar}
              width={25}
              height={25}
              alt="logo"
            />
          </div>
        </div>
      </button>
      <ul
        className={`${open ? 'visible duration-300 md:w-[230px]' : 'invisible'} absolute right-0 top-12 z-50  rounded-sm bg-white shadow-md px-3 py-4`}
      >
        {token &&
          DropDownData?.map((item, idx) => (
            <Link
              href={item.path}
              key={idx}
              className={`rounded-sm px-6 py-2 ${open ? 'opacity-100 duration-300 cursor-pointer' : 'opacity-0'}  `}
            >
              <div className="flex items-center justify-start gap-3 space-y-1">
                <span className="mt-2 text-lg text-gray-500 ">{item.icon}</span>
                <h1 className="text-sm font-medium text-gray-500">
                  {item.name}
                </h1>
              </div>
            </Link>
          ))}

        {/* logout  */}

        {token ? (
          <div
            onClick={() => {
              dispatch(logout()), 
               toast({
        title: 'Logged Out Successfully!',
      });
              setOpen(false);
            }}
            className="flex items-center gap-3 space-y-1 text-gray-500 cursor-pointer"
          >
            <span className="mt-2 text-lg ">
              <AiOutlineLogout />
            </span>
            <h1 className="text-sm font-medium">Logout</h1>
          </div>
        ) : (
          <div className="">
            <AuthModal />
            {/* login modal ----- */}

            <div
              onClick={() => {
                dispatch(switchToLogin()), setOpen(false);
              }}
              className="items-center hidden gap-3 space-y-1 text-gray-500 cursor-pointer lg:flex"
            >
              <span className="mt-2 text-lg ">
                <FaRegUser />
              </span>
              <h1 className="text-sm font-medium">Login</h1>
            </div>

            {/* Sign up modal */}

            <div
              onClick={() => {
                dispatch(switchToRegister()), setOpen(false);
              }}
              className="items-center hidden gap-3 space-y-1 text-gray-500 cursor-pointer lg:flex"
            >
              <span className="mt-2 text-lg ">
                <IoIosUnlock />
              </span>
              <h1 className="text-sm font-medium">Register</h1>
            </div>

            <div className="flex items-center gap-3 space-y-1 text-gray-500 cursor-pointer">
              <span className="mt-2 text-lg ">
                <TbPhoneCall />
              </span>
              <h1 className="text-sm font-medium">Help Center</h1>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ProfileDropDown;
