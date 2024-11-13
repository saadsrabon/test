import { CiCircleMore } from 'react-icons/ci';

// import component 👇
import { useState } from 'react';
import Drawer from 'react-modern-drawer';

//import styles 👇
import { DropDownData } from '@/lib/Data/DropDownData';
import Link from 'next/link';
import 'react-modern-drawer/dist/index.css';
import { useSelector } from 'react-redux';
import { NormalDropDownData } from '../../../lib/Data/DropDownData';

const MoreSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      onClick={toggleDrawer}
      className="space-y-1 grid place-items-center text-[#5A627F]/90 lg:hidden cursor-pointer w-[50px]"
    >
      <span className="">
        <CiCircleMore className="text-lg sm:text-xl" />
      </span>
      <h1 className="font-medium text-[10px] sm:text-xs">More</h1>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla "
      >
        <div className="flex flex-col justify-between items-start">
          {user?.role == 'host' ? (
            <div>
              {DropDownData?.map((item, idx) => (
                <Link
                  href={item.path}
                  key={idx}
                  className={`rounded-sm px-6 py-2 ${open ? 'opacity-100 duration-300 cursor-pointer' : 'opacity-0'}  `}
                >
                  <div className="flex items-center justify-start gap-3 px-4 space-y-1">
                    <span className="mt-2 text-lg text-gray-500 ">
                      {item.icon}
                    </span>
                    <h1 className="text-sm font-medium text-gray-500">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              {NormalDropDownData?.map((item, idx) => (
                <Link
                  href={item.path}
                  key={idx}
                  className={`rounded-sm px-6 py-2 ${open ? 'opacity-100 duration-300 cursor-pointer' : 'opacity-0'}  `}
                >
                  <div className="flex items-center justify-start gap-3 px-4 space-y-1">
                    <span className="mt-2 text-lg text-gray-500 ">
                      {item.icon}
                    </span>
                    <h1 className="text-sm font-medium text-gray-500">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MoreSidebar;
