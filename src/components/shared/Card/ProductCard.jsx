'use client';
import share from '@/assets/home/Product/share.png';
import { getLocalData } from '@/lib/auth/token';
import { CalculateDistance2nd } from '@/lib/GetDistance';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RWebShare } from 'react-web-share';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductCard = ({ item }) => {
  const {
    title,
    date,
    pricesPlan,
    fullAddress,
    fullAddress2,
    avgRating,
    ratings,
    _id: id,
    images,
    videos,
  } = item;
  const [favourite, setFavourite] = useState(false);
  const swiperRef = useRef(null);
  const [favorite, setFavorite] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [selectedId, setSelectedId] = useState(1);

  const Gallerynew = [
    ...images.map((img, index) => ({
      id: index + 1,
      img,
      type: 'image',
    })),
    // ...videos.map((img, index) => ({
    //   id: images.length + index + 1,
    //   img,
    //   type: 'video',
    // })),
  ];
  // console.log(Gallerynew);

  useEffect(() => {
    const getTheDistance = async () => {
      const getLattiLongi = getLocalData('location');
      console.log(getLattiLongi);
      if (!getLattiLongi) {
        return;
      }

      const distance = await CalculateDistance2nd(fullAddress, getLattiLongi);
      console.log(distance);

      setTotalDistance(distance.toFixed(2));
    };
    getTheDistance();
  }, [fullAddress]);

  return (
    <Link
      href={`/activity/${id}`}
      className="flex flex-col gap-3 mx-auto rounded-xl relative max-w-[400px]"
    >
      {/* Product Card Image */}
      <div className="relative max-w-full mx-auto group">
        <div className="grid grid-cols-1">
          <Swiper
            pagination={true}
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: `.custom-next${id}`,
              prevEl: `.custom-prev${id}`,
            }}
            className="flex mySwiper"
          >
            {Gallerynew?.map((per, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative object-cover w-full h-full">
                  {/* Image and Icons */}
                  <div>
                    <div
                      onClick={() => setFavorite(!favorite)}
                      className="absolute cursor-pointer top-[20px] right-3 text-lg bg-white p-2 rounded-full"
                    >
                      {favorite ? (
                        <GoHeartFill className="text-primary" />
                      ) : (
                        <GoHeart />
                      )}
                    </div>
                    <RWebShare
                      data={{
                        text: 'For better lifestyle take session from here',
                        url: 'https://lms-colombia-client.vercel.app/',
                        title: 'Sparktivity',
                      }}
                    >
                      <div className="absolute cursor-pointer top-[20px] right-14 p-2 rounded-full bg-white">
                        <Image alt="share" src={share} />
                      </div>
                    </RWebShare>
                  </div>
                  <Image
                    className="w-full h-[200px] rounded-t-lg"
                    src={per.img}
                    alt={`a1${idx + 1}`}
                    width={500}
                    height={500}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-2 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 ">
          {/* Prev Button */}
          {selectedId == 1 ? (
            <div
              className={`custom-prev${id} bg-white rounded-full text-gray-600 px-1 py-1 z-30  pointer-events-auto border  opacity-70  transition-all duration-300`}
            >
              <IoIosArrowBack />
            </div>
          ) : (
            <div
              onClick={() => {
                setSelectedId(selectedId - 1);
              }}
              className={`custom-prev${id} bg-white rounded-full text-gray-600 px-1 py-1 z-30  pointer-events-auto border opacity-100 cursor-pointer transition-all duration-300`}
            >
              <IoIosArrowBack />
            </div>
          )}

          {/* Next Button */}

          {selectedId == Gallerynew.length ? (
            <div
              className={`custom-next${id} bg-white text-gray-600 px-1 py-1 rounded-full z-30  pointer-events-auto border  opacity-70 transition-all duration-300`}
            >
              <IoIosArrowForward />
            </div>
          ) : (
            <div
              onClick={() => {
                setSelectedId(selectedId + 1);
              }}
              className={`custom-next${id} bg-white text-gray-600 px-1 py-1 rounded-full z-30 cursor-pointer pointer-events-auto border   opacity-100 transition-all duration-300`}
            >
              <IoIosArrowForward />
            </div>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col justify-between gap-1">
        <div className="flex justify-between">
          <h4 className="font-semibold">
            {title.length > 30 ? (
              <span>{title.slice(0, 30)}...</span>
            ) : (
              <span>{title}</span>
            )}
          </h4>
          <div className="w-[40px]">
            <p className="flex items-center justify-end gap-1 text-sm font-bold">
              <FaStar className="text-2xl" />
              {parseFloat(avgRating).toFixed(1)}
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1 text-sm text-gray-600">
          {moment(date).format('LL')}{' '}
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          {moment(date).format('LT')}
        </p>
        <p className="text-sm text-gray-600">
          {totalDistance} km from your place
        </p>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-800">
              ${pricesPlan[0]?.price}
            </span>{' '}
            total
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
