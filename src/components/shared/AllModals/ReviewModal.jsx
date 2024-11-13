'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa6';
import TextArea from '../StepInputs/TextArea';

const ReviewModal = ({
  name,
  className,
  title1,
  data,
  RateBookingActivity,
}) => {
  const [openModal, setOpenModal] = useState(false);
  // form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [userRating, setUserRating] = useState(1);
  const onSubmit = (data) => {
    console.log('value', data);
    RateBookingActivity(userRating, data.review);
  };

  return (
    <div className="">
      <button
        onClick={() => setOpenModal(true)}
        className={cn(
          'bg-primary text-white px-8 py-2 text-sm rounded-sm',
          className
        )}
      >
        {name}
      </button>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e_) => e_.stopPropagation()}
          className={`md:w-[30%] space-y-6 absolute rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}
        >
          {/* infos */}
          <div className="space-y-3">
            <p className="text-sm font-bold">{title1}</p>
            <div className="flex items-center justify-start gap-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onMouseMove={() => setUserRating(star)}
                    className="text-lg cursor-pointer"
                    color={star <= userRating ? '#f2b00a' : '#94a3b8'}
                  />
                ))}
              </div>
              <p className="text-xs">{userRating} Star</p>
            </div>

            <TextArea
              register={register}
              name="review"
              placeholder="Write your review"
            />
          </div>
          {/* infos */}
          {/* <div className="space-y-3">
            <p className="text-sm font-bold">Rate Ryan Isac</p>
            <div className="flex items-center justify-start gap-4">
              <Rating />
              <p className="text-xs">4 Star</p>
            </div>

            <TextArea
              register={register}
              name="secondReview"
              placeholder="Write your review"
            />
          </div> */}

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 text-sm rounded-sm"
          >
            Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
