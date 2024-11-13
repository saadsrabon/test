import SingleReviewModal from '@/components/shared/AllModals/SingleReviewModal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const RatedStudentsCard = ({ edited, data }) => {
  const { profile, name } = data;
  return (
    <div className="bg-white border px-6 py-4 flex gap-3 items-center border-gray-300 rounded-lg">
      <Image src={profile} alt="profile" className="w-[70px]" />
      <div className="flex flex-col justify-between gap-4">
        <h3 className="font-bold">{name}</h3>
        <div>
          {edited ? (
            <Button className="py-2 w-[120px] px-2 sm:text-base text-sm  bg-foundation hover:bg-foundation">
              Edit
            </Button>
          ) : (
            <div>
              <SingleReviewModal title="Rate your student" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatedStudentsCard;
