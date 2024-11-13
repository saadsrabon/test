import logo from '@/assets/logo.png';
import DashboardNavData from '@/lib/Data/DashboarNavData';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  IoIosArrowForward,
  IoIosMenu,
  IoIosNotificationsOutline,
} from 'react-icons/io';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const MobileLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const router = usePathname();

  const [selectedNavroute, setselectedNavRoute] = useState(router);
  return (
    <>
      <div className=" w-full lg:hidden py-3  px-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer mr-6">
            <Image className="w-[100px]" src={logo} alt="logo" />{' '}
          </Link>

          <button
            onClick={toggleDrawer}
            className=" text-xl p-2 hover:bg-foundation/60 "
          >
            <IoIosMenu />
          </button>
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className="w-full bg-[#F6F6F6]  py-20 h-[100vh]">
            {/* user  */}
            <div className="flex justify-between px-7 gap-2 items-center">
              <h3 className="text-sm font-semibold">HI,</h3>
              <div className="p-2 bg-white text-xl rounded-lg cursor-pointer">
                <IoIosNotificationsOutline />
              </div>
            </div>

            {/* Route */}
            <div className="flex flex-col mt-6 ">
              {DashboardNavData.map((navItem) => (
                <Link
                  onClick={() => {
                    setselectedNavRoute(navItem.route);
                  }}
                  href={navItem?.route}
                  key={navItem?.id}
                  className={`py-3 ${navItem?.route == selectedNavroute ? 'bg-foundation text-white' : 'text-gray-400'} `}
                >
                  <h2 className="pl-7 flex gap-1 items-center text-lg">
                    <IoIosArrowForward /> {navItem.label}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileLayout;
