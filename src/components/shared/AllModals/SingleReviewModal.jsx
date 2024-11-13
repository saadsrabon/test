'use client';
import Rating from '@/components/Pages/ActivityDetails/ActivityTestimonial/Rating';
import TextArea from '../StepInputs/TextArea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const SingleReviewModal = ({ className, title }) => {
  const [openModal, setOpenModal] = useState(false);
  // form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log('value', data);
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className={cn(
          'sm:py-3 text-white rounded-lg py-2 px-2 sm:text-base text-sm sm:px-4 bg-foundation hover:bg-foundation',
          className
        )}
      >
        {title}
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
            <p className="text-sm font-bold">
              Give a review to Yoga Session with Ryan
            </p>
            <div className="flex items-center justify-start gap-4">
              <Rating />
              <p className="text-xs">4 Star</p>
            </div>

            <TextArea
              register={register}
              name="firstReview"
              placeholder="Write your review"
            />
          </div>

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

export default SingleReviewModal;
