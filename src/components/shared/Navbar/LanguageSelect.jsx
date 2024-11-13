'use client';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';

const LanguageSelect = ({ setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    "en"
  );
  const Language = [
    {
      lang: 'English', 
      code: 'en',
     },
    {
      lang: 'Spanish',
      code: 'es',
    }];
  
  const handleLanguageChange = (code) => {
    setSelectedValue(code);
    setLanguage(code); // Update language in RootLayout
  };
  return (
    <div className="relative">
      <li
        onClick={() => setIsOpen(!isOpen)}
        className=" flex cursor-pointer items-center justify-between py-2 text-secondary font-medium"
      >
        {selectedValue === 'en' ? 'English' : 'Spanish'}
      </li>
      <div
        className={`${isOpen ? 'visible top-6 -left-28  opacity-100' : 'invisible -top-4 -left-28 opacity-0'} absolute z-10 mt-3 w-40 cursor-pointer rounded-md border bg-white duration-300 `}
      >
        {Language?.map((lng) => (
          <div
            key={lng.code}
            onClick={(e) => {
              setIsOpen(false);
              handleLanguageChange(lng.code)
            }}
            className={`rounded-md px-6 py-2 font-semibold text-gray-500 hover:bg-gray-100 dark:text-gray-100 hover:dark:bg-gray-700`}
          >
            {lng.lang}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;