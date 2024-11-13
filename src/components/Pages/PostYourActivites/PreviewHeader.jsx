'use client';
import Container from '@/components/shared/Container/Container';
import React from 'react';
import Link from 'next/link';
import { IoIosStar } from 'react-icons/io';
import { IoDownloadOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { RWebShare } from 'react-web-share';
import share from '@/assets/home/Product/share.png';
import Image from 'next/image';

const PreviewHeader = () => {
  return (
    <Container>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:pt-12 pt-6 pb-12 lg:pb-6">
          <div className="gap-4 flex">
            <h5 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#091540]">
              Yoga Session with Ryan
            </h5>
            <div className="flex items-center gap-1">
              <IoIosStar className="text-gray-800" />
              <span className="text-sm text-gray-800">4.99</span>
              <div className="size-[1.5px] rounded-full bg-black"></div>
              <span className="text-gray-400 text-sm">337 Reviews</span>
            </div>
          </div>
          <Link className="text-primary text-sm" href="/activity/4">
            Required Profile Completion
          </Link>
        </div>
        <div className="lg:flex  gap-6 hidden">
          <RWebShare
            data={{
              text: 'For better lifestyle take session form here',
              url: 'https://lms-colombia-client.vercel.app/',
              title: 'Sparktivity',
            }}
          >
            <div className="text-[#091540] flex items-end gap-1">
              <IoDownloadOutline className="text-[22px]" />
              <span className="font-medium">Share</span>
            </div>
          </RWebShare>

          <div className="text-[#091540] flex items-end gap-1 cursor-pointer">
            <CiHeart className="text-[22px]" />
            <span className="font-medium">Add to favorites</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewHeader;
