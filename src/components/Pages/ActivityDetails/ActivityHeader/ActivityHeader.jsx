'use client';
import Container from '@/components/shared/Container/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoIosStar } from 'react-icons/io';
import { IoDownloadOutline } from 'react-icons/io5';
import { RWebShare } from 'react-web-share';

import { useToast } from '@/components/ui/use-toast';
import { getAccessToken } from '@/lib/auth/token';

const ActivityHeader = ({ data }) => {
  const { toast } = useToast();
  const [cookieData, setCookieData] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    try {
      const cookieValue = Cookies.get('name');
      if (cookieValue) {
        const data = JSON.parse(cookieValue);
        setCookieData(data);
        if (
          data &&
          data._id &&
          data._id === data.favouritedBy?.find((id) => id === data._id)
        ) {
          setIsFavorited(true);
        }
      } else {
        console.log('Cookie not found');
      }
    } catch (error) {
      console.error('Failed to parse cookie:', error);
      // You can set a default value if parsing fails
      setCookieData({});
    }
  }, [data]);

  const AddToFavorite = async () => {
    const token = getAccessToken();
    // console.log(token)
    // console.log(cookieData._id)
    // console.log(data._id)
    console.log('hello');
    try {
      const result = await axios.post(
        `https://api.elplanes.com/api/v1/favorite/addToFavorite/${cookieData._id}`,
        {
          activity_id: data._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log(result.data);
      toast({
        title: 'Added to favorites',
      });
      setIsFavorited(true);
    } catch (err) {
      toast({
        title: "Couldn't add to favorites",
      });
    }
  };
  const RemoveFromFavorites = async () => {
    const token = getAccessToken();
    // console.log(token)
    // console.log(cookieData._id)
    // console.log(data._id)
    console.log('hello');
    try {
      const result = await axios.delete(
        `https://api.elplanes.com/api/v1/favorite/remove/${cookieData._id}`,
        {
          activity_id: data._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log(result.data);
      toast({
        title: 'Remove from favourites',
      });
      console.log(result.data);
      setIsFavorited(false);
    } catch (err) {
      toast({
        title: "Couldn't remove from favorites",
      });
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:pt-12 pt-6 pb-12 lg:pb-6">
          <div className="gap-4 flex">
            <h5 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#091540]">
              {data?.title}
            </h5>
            <div className="flex items-center gap-1">
              <IoIosStar className="text-gray-800" />
              <span className="text-sm text-gray-800">{data?.avgRating}</span>
              <div className="size-[1.5px] rounded-full bg-black"></div>
              <span className="text-gray-400 text-sm">
                Reviews {data?.rating?.length}
              </span>
            </div>
          </div>
          {data?.profileCompletionRequired ? (
            <Link className="text-primary text-sm" href="/activity/4">
              Required Profile Completion
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className="lg:flex cursor-pointer  gap-6 hidden">
          <RWebShare
            data={{
              text: 'For better lifestyle take session form here',
              url: `https://lms-colombia-client.vercel.app/activity/${data?._id}`,
              title: 'Sparktivity',
            }}
          >
            <div className="text-[#091540] flex items-center gap-1">
              <IoDownloadOutline className="text-[22px]" />
              <span className="font-medium">Share</span>
            </div>
          </RWebShare>
          {isFavorited ? (
            <div
              onClick={RemoveFromFavorites}
              className="text-[#091540] flex items-center gap-1 cursor-pointer"
            >
              <CiHeart className="text-[22px]" />
              <span className="font-medium">Remove from favorites</span>
            </div>
          ) : (
            <div
              onClick={AddToFavorite}
              className="text-[#091540] flex items-center gap-1 cursor-pointer"
            >
              <CiHeart className="text-[22px]" />
              <span className="font-medium">Add to favorites</span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ActivityHeader;
