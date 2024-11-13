'use client';

import Category from '@/components/Pages/Home/Category/Category';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BsSliders } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import FilterModal from '../AllModals/FilterModal/FilterModal';

const SearchFilterMobile = () => {
  const [openModal, setOpenModal] = useState(false);

  const pathname = usePathname();
  console.log(pathname);
  const isHidden = pathname.includes('/activity/');

  return (
    <>
      <div
        className={`${isHidden && 'hidden'} sticky top-0 z-50 w-full bg-white flex items-center gap-6 justify-between mx-auto p-4 lg:py-6 lg:hidden`}
      >
        <div className="border pl-3 pr-2 py-2 max-w-[280px] rounded-[500px] flex justify-between items-center gap-3">
          <IoIosSearch className="text-[28px] " />
          <div className="space-y-1">
            <h6 className="text-xs font-semibold">Search</h6>
            <Input
              className=" border-none  h-[6px] px-0 rounded-none focus:outline-none text-xs focus:border-none focus:ring-0"
              placeholder="Search activities with name"
            />
          </div>
        </div>

        <div className="items-center gap-5 p-1 border rounded-full">
          <BsSliders
            onClick={() => setOpenModal(true)}
            className="text-[#091540] size-9 p-1.5"
          />
        </div>
      </div>
      {/* <LanguageSwitcher /> */}
      <FilterModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="lg:hidden">
        <Category className="z-30" />
      </div>
    </>
  );
};

export default SearchFilterMobile;
