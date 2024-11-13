'use client';
import Container from '@/components/shared/Container/Container';
import settings from '@/components/shared/SliderSetting/CategorySlider';
import { cn } from '@/lib/utils';
import { useGetuserTypesQuery } from '@/store/usertypes/usertypes';
import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Me from "@/assets/image.png"

const Category = ({ className }) => {
  const [selected, setSelected] = useState(1);
  // Slider Setting
  const { data: { data: category } = [], isLoading } = useGetuserTypesQuery();
  return (
    <>
      {/* big screen category with slider */}
      <div
        className={cn(
          ' lg:block hidden sticky pt-3 top-0 z-30 bg-white px-5  shadow-b shadow-sm border-y-[1px]',
          className
        )}
      >
        <Container>
          <div className="overflow-hidden ">
            <Slider {...settings}>
              {category?.map((category) => (
                <div
                  onClick={() => {
                    setSelected(category.serial);
                  }}
                  key={category.serial}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Image
                    width={100}
                    height={100}
                    className="w-6 h-8 mx-auto mt-2 md:h-10 md:w-8 "
                    src={category.logo}
                    alt={`${category.type}`}
                  />
                  <h5 className="mx-auto mt-2 text-xs text-center md:text-sm w-max">
                    {category.type}
                  </h5>
                  <div
                    className={` mx-auto mt-2 text-xs md:text-base w-[80px] ${selected == category.serial ? 'bg-secondary' : 'bg-white'}  h-1`}
                  >
                    {/* <h5 className="invisible text-xs text-center md:text-sm">
                      {category.type}
                    </h5> */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      </div>
      {/* small screen category without slider */}

      <div className="lg:hidden sticky top-[70px]   block  z-[30] bg-white px-3  shadow-b shadow-sm border-b-[1px]">
        <div className=" overflow-x-auto overflow-y-hidden max-w-[1400px]  pt-5  mx-auto  flex justify-between  gap-4 removeTypeScroll">
          {/* <Slider {...settings}> */}
          {category?.map((category) => (
            <div
              onClick={() => {
                setSelected(category.serial);
              }}
              key={category.serial}
              className="flex flex-col items-center justify-start cursor-pointer"
            >
              <Image
                width={100}
                height={100}
                className="w-6 h-8 mx-auto mt-2 md:h-10 md:w-auto"
                src={category.logo}
                alt={`${category.type}`}
              />
              <h5 className="mt-2 text-xs text-center md:text-sm">
                {category.type}
              </h5>
              <div
                className={` mx-auto mt-2 text-xs md:text-base w-max ${selected == category.serial ? 'bg-secondary' : 'bg-white'}  h-1`}
              >
                <h5 className="invisible text-xs text-center md:text-sm">
                  {category.type}
                </h5>
              </div>
            </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </>
  );
};

export default Category;
