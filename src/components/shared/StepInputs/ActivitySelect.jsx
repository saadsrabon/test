import { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';

export default function ActivitySelect({ className, name, setValue, last, label = "", defaultValue, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  // Use ref to track the dropdown container
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside the dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener for clicks on the document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      {/* dropdown - btn */}
      <div onClick={() => setIsOpen(!isOpen)} className="flex">
        <div className="flex justify-between w-full px-3 py-2 border border-slate-300 rounded-xl">
          <div>
            <label className="text-[13px]" htmlFor={label}>
              {label}
            </label>
            <h1 className="font-medium text-slate-400">{defaultValue || selectedValue || 'Select'}</h1>
          </div>
          <svg
            className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`}
            width={25}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10L12 15L17 10"
                stroke="#4B5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>
          </svg>
        </div>
      </div>
      {/* dropdown - options  */}
      <div
        className={`absolute w-full z-50 ${isOpen ? (last ? 'visible -top-[380px] opacity-100 z-50' : 'visible top-14 opacity-100') : last ? 'invisible -top-[410px] opacity-0 ' : 'invisible top-10 opacity-0'}  mx-auto my-4 rounded-xl py-4 border duration-300 !bg-white max-h-[350px] overflow-y-auto `}
      >
        {options?.map((option, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              setSelectedValue(e.target.textContent);
              setValue(e.target.textContent);
              setIsOpen(false);
            }}
            className="px-6 py-2 text-gray-500 hover:bg-gray-100"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
