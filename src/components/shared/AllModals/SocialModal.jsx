'use client';
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import facebook from '../../../assets/socials/facebook.png';
import twitter from '../../../assets/socials/twitter.png';
import instagram from '../../../assets/socials/instagram.png';
import linkedin from '../../../assets/socials/linkedin.png';
import youtube from '../../../assets/socials/youtube.png';
import Image from 'next/image';
const SocialModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const socialInfos = [
    {
      icon: facebook,
      title: 'Facebook',
    },
    {
      icon: twitter,
      title: 'X.com',
    },
    {
      icon: instagram,
      title: 'Instagram',
    },
    {
      icon: linkedin,
      title: 'Linkedin',
    },
    {
      icon: youtube,
      title: 'YouTube',
    },
  ];
  return (
    <div className="">
      <button onClick={() => setOpenModal(true)}>
        <FiEdit3 />
      </button>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`text- absolute  md:w-96 space-y-5 rounded-xl bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}
        >
          <h1 className="mb-2 text-lg font-semibold">Social Media</h1>
          <div className="space-y-5">
            {socialInfos?.map((socialInfo, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-10"
              >
                <div className="flex justify-center  items-center gap-5 ">
                  <Image src={socialInfo.icon} alt="" />
                  <p className="text-xs"> {socialInfo.title}</p>
                </div>
                <button className="border border-black px-3 py-1 text-xs rounded-md font-semibold">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
