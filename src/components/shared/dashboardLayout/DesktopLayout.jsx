'use client';
import DashboardNavData from '@/lib/Data/DashboarNavData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowForward, IoIosNotificationsOutline } from 'react-icons/io';

const DesktopLayout = () => {
  const router = usePathname();

  const [selectedNavRoute, setSelectedNavRoute] = useState(router);
  return (
    <div className="w-full bg-[#F6F6F6] lg:block hidden py-20 h-[100vh] sticky top-0">
      {/* user  */}
      <div className="flex items-center justify-between px-10">
        <h3 className="text-lg font-semibold">Welcome to dashboard</h3>
        <div className="p-3 text-2xl bg-white rounded-lg cursor-pointer">
          <IoIosNotificationsOutline />
        </div>
      </div>

      {/* Route */}
      <div className="flex flex-col mt-6 ">
        {DashboardNavData.map((navItem) => (
          <Link
            onClick={() => {
              setSelectedNavRoute(navItem?.route);
            }}
            href={navItem?.route}
            key={navItem?.id}
            className={`py-3 ${navItem?.route == selectedNavRoute ? 'bg-foundation text-white' : 'text-gray-400'} `}
          >
            <h2 className="flex items-center gap-1 pl-10 text-lg">
              <IoIosArrowForward /> {navItem?.label}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopLayout;
