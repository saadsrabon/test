'use client';
import { useToast } from '@/components/ui/use-toast';
import { useRateActivityMutation } from '@/store/activity/activity';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { RWebShare } from 'react-web-share';
import share from '../../../../assets/home/Product/share.png';
import ReviewModal from '../../AllModals/ReviewModal';

const ReviewCard = ({ className, text, status, item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [favorite, setFavorite] = useState(false);
  const [rateActivity] = useRateActivityMutation();
  const { toast } = useToast();
  const RateBookingActivity = async (rating, review) => {
    try {
      const user = Cookies.get('name');
      const UserData = JSON.parse(user);
      const reviewData = {
        body: {
          user: UserData?._id,
          rate: rating,
          review: review,
        },
        id: item?.activityId?._id,
      };
      const result = await rateActivity(reviewData);
      toast({
        title: 'Successfully reviewed the activity',
      });
    } catch (err) {
      toast({
        title: 'Failed to review the activity',
      });
    }
  };
  console.log(item);
  return (
    <div className="relative max-w-80 border rounded-xl space-y-2">
      <Image
        src={item?.activityId?.images[0]}
        width={500}
        height={500}
        alt="Cover picture"
        className="rounded-t-xl"
      />
      {/* button */}
      {/* favorite  */}
      <div
        onClick={() => {
          setFavorite(!favorite);
        }}
        className="absolute cursor-pointer top-3 right-3 text-white text-xl "
      >
        {favorite ? <GoHeartFill className="text-primary" /> : <GoHeart />}
      </div>
      {/* share icon */}
      <RWebShare
        data={{
          text: 'For better lifestyle take session form here',
          url: 'https://lms-colombia-client.vercel.app/',
          title: 'Sparktivity',
        }}
      >
        <div className="absolute cursor-pointer top-3 left-3 p-2 rounded-full bg-gray-200">
          <Image alt="share" src={share} />
        </div>
      </RWebShare>
      <div className="flex justify-between items-center p-3 ">
        <div className="space-y-2">
          <h1 className="text-xs md:text-sm font-semibold">
            {item?.activityId?.title}
          </h1>
          {/* <p className="text-secondary text-xs">{moment().format('ll')}</p> */}
        </div>

        {!item?.rated ? (
          <ReviewModal
            data={item}
            name="Review"
            title1={`Give a review to ${item?.activityId?.title}`}
            firstRating="4 star"
            className=" text-white px-4 py-2 rounded-md text-xs"
            RateBookingActivity={RateBookingActivity}
          />
        ) : (
          <button className="bg-tertiary text-white px-4 py-2 rounded-md text-xs">
            Rated
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
