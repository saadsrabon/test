'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Container from '../Container/Container';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import { MdOutlineMailOutline } from 'react-icons/md';
import Link from 'next/link';

const Footer = () => {
  const pathname = usePathname();

  const isActivityPage = pathname.includes('/activity/');
  return (
    <div
      className={`bg-[#E6E8EC] py-20 px-4 ${isActivityPage && 'hidden lg:block'}`}
    >
      <Container>
        <div className="grid grid-cols-1 space-y-10 lg:space-y-0 md:grid-cols-2 lg:grid-cols-5 justify-start items-start md:justify-center lg:items-start">
          {/* 1st grid */}
          <div className="space-y-4 lg:mx-0 lg:col-span-2">
            <Image src={logo} alt="logo" />
            <p className="text-start text-secondary text-sm max-w-[200px]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="flex justify-start items-start gap-3 text-primary ">
              <FaFacebookF />
              <FaTwitter />
              <AiFillInstagram />
              <FaLinkedinIn />
              <FaYoutube />
            </div>
          </div>
          {/* 2nd grid */}
          <div className="text-start">
            <h1 className="text-base font-bold mb-4 lg:mb-8">SUPPORT</h1>
            <div className="text-secondary text-sm  space-y-4">
              <h5>Help Center</h5>
              <h5>Cancelation Options </h5>
              <div>
                <Link href="/faq">
                  <h5>FAQ’s</h5>
                </Link>
              </div>
              <div>
                <Link href="/dashboard/post-activities">
                  <h5>Post Your Activity</h5>
                </Link>
              </div>
            </div>
          </div>
          {/* 3rd grid */}
          <div className="text-start ">
            <h1 className="text-base font-bold mb-4 lg:mb-8">QUICK LINKS</h1>
            <div className="text-secondary space-y-4 text-sm">
              <div>
                <Link href="/my-favorites">
                  <h5>My Favorites</h5>
                </Link>
              </div>
              <div>
                <Link href="/my-calendar">
                  <h5>My Calendar</h5>
                </Link>
              </div>
            </div>
          </div>
          {/* 4th grid */}
          <div className="text-start ">
            <h1 className="text-base font-bold mb-4 lg:mb-8"> CONTACT US</h1>
            <div className="text-secondary text-sm">
              <h5 className="flex justify-start items-center gap-2">
                <MdOutlineMailOutline /> contact@sparktivity.co,
              </h5>
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="border-b border-gray-300 mt-10 mb-5 px-20"></div>

        <div className="flex flex-col lg:flex-row space-y-5 justify-between items-center text-secondary text-sm">
          <h5>Copyright © 2024 HF Consultancy</h5>
          <h5 className="text-start text-xs">
            All Rights Reserved |
            <span className="text-primary">Terms and Conditions </span>|
            <span className="text-primary">Privacy Policy</span>
          </h5>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
