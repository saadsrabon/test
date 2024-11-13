'use client';

import Container from '@/components/shared/Container/Container';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

const Faq = () => {
  const [isOpen, setIsOpen] = useState(null);
  const accordionsData = [
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
  ];

  // right side accordion
  const [isIconOpen, setIsIconOpen] = useState(null);
  const accordionData = [
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
    {
      title: 'What is AirCover?',
      description:
        'AirCover is comprehensive protection included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour safety line.',
      link: 'Learn more about how AirCover protects your booking',
    },
  ];
  const toggleBtn = (id) => {
    setIsIconOpen((prevId) => (prevId === id ? null : id));
  };

  const [faqFirstData, setFaqFirstData] = useState([]);
  const [faqSecondData, setFaqSecondData] = useState([]);

  useEffect(() => {
    const getFaqData = async () => {
      try {
        const res = await axios.get('https://api.elplanes.com/api/v1/faq');
        console.log(res);
        const middleIndex = Math.floor(res.data.data.length / 2);
        const firstHalf = res.data.data.slice(0, middleIndex);
        const secondHalf = res.data.data.slice(middleIndex);
        setFaqFirstData(firstHalf);
        setFaqSecondData(secondHalf);
      } catch (e) {
        console.error(e);
      }
    };
    getFaqData();
  }, []);

  return (
    <Container>
      <h1 className="text-xl font-bold mt-20">Frequently Asked Questions</h1>
      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 my-10  ">
        {/* left accordion */}
        <div className=" rounded-lg   lg:border-none border-b">
          {faqSecondData.map((PerAccordion, idx) => (
            <div
              key={idx}
              className="border-b border-gray-300 last-of-type:border-none"
            >
              <button
                onClick={() =>
                  setIsOpen((prevIdx) => (prevIdx === idx ? null : idx))
                }
                className="flex h-full w-full items-center justify-between py-4 font-medium text-black"
              >
                <span className="font-semibold text-lg ">
                  {PerAccordion.question}
                </span>
                <span className=" p-2 ">
                  <MdKeyboardArrowUp
                    className={`origin-center transform transition duration-200 ease-out ${
                      isOpen === idx && '!rotate-180'
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid overflow-hidden text-gray-400 transition-all duration-300 ease-in-out ${
                  isOpen === idx
                    ? 'grid-rows-[1fr] pb-3 opacity-100'
                    : 'grid-rows-[0fr] h-0 opacity-0'
                }`}
              >
                <div className="overflow-hidden text-[#717171] text-sm font-semibold max-w-lg">
                  {PerAccordion.answer}
                </div>
                {/* <p className="underline text-xs font-bold text-black mt-5  cursor-pointer">
                  {PerAccordion.link}
                </p> */}
              </div>
            </div>
          ))}
        </div>
        {/* right accordion */}
        <div className=" rounded-lg ">
          {faqSecondData.map((PerAccordion, id) => (
            <div
              key={id}
              className="border-b border-gray-300 last-of-type:border-none"
            >
              <button
                onClick={() => toggleBtn(id)}
                className="flex h-full w-full items-center justify-between py-4 font-medium text-black "
              >
                <span className="font-semibold text-lg">
                  {PerAccordion.question}
                </span>
                <span className="rounded-full p-2 ">
                  <MdKeyboardArrowUp
                    className={`origin-center transform transition duration-200 ease-out ${
                      isIconOpen === id && '!rotate-180'
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid overflow-hidden text-gray-400 transition-all duration-300 ease-in-out ${
                  isIconOpen === id
                    ? 'grid-rows-[1fr] pb-3 opacity-100'
                    : 'grid-rows-[0fr] h-0 opacity-0'
                }`}
              >
                <div className="overflow-hidden  text-[#717171] text-sm font-semibold max-w-lg">
                  {PerAccordion.answer}
                </div>
                {/* <p className="underline text-xs font-bold text-black mt-5 cursor-pointer">
                  {PerAccordion.link}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Faq;
