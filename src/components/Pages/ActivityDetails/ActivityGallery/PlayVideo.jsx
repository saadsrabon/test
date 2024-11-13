'use client'
import { useState } from 'react';
import v1 from '@/assets/activityDetails/gallery/v1.mp4';
import { IoMdPlay } from "react-icons/io";
import { Button } from '@/components/ui/button';

 const PlayVideo = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenModal(true)} className="h-full py-4 pl-4 pr-[14px] rounded-full  bg-white/80 grid place-items-center ">
        <IoMdPlay className="text-[20px] text-black" />
      </div>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center  justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute max-w-xl rounded-lg bg-white text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}
        >
          <video
            className="w-full rounded-lg h-full"
            width="320"
            height="240"
            controls
          >
            <source className="h-full" src={v1} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;