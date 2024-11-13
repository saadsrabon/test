'use client';

import { useToast } from '@/components/ui/use-toast';
import {
  useCancelBookingMutation,
  useRescheduleBookingMutation,
} from '@/store/activity/activity';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { RWebShare } from 'react-web-share';
import share from '../../../../assets/home/Product/share.png';
import RescheduleModal from '../../AllModals/RescheduleModal';
const ScheduleCard = ({ item }) => {
  const [selectedDate, setSelectedDate] = useState(item ? item.date : '');
  const [futureDates, setFutureDates] = useState(
    item ? item?.activityId?.futureDates : []
  );
  const [openModal, setOpenModal] = useState(false);
  const [rescheduleBooking] = useRescheduleBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const { toast } = useToast();
  // console.log(selectedDate, futureDates);
  const bookingReschduling = async () => {
    try {
      const payload = {
        date: selectedDate,
        time: item.time,
        id: item?._id,
      };
      const res = await rescheduleBooking(payload);
      if (res) {
        toast({
          title: 'Booking have been reschudled',
        });
      }
      setOpenModal(false);
    } catch (err) {
      toast({
        title: 'Failed to reschudle',
      });
      setOpenModal(false);
    }
  };

  const BookingCancelation = async () => {
    try {
      const payload = {
        id: item?._id,
      };
      const res = await cancelBooking(payload);
      if (res) {
        toast({
          title: 'Booking have been cancelled',
        });
      }
    } catch (err) {
      toast({
        title: 'Failed to cancel',
      });
    }
  };
  return (
    <div className="relative max-w-80 border rounded-xl flex flex-col gap-2">
      {/* Image */}
      <Image
        alt="share"
        src={item?.activityId?.images[0]}
        width={400}
        height={400}
      />

      {/* Cancel button */}
      {/* <button
        onClick={BookingCancelation}
        className="bg-gray-200 hover:bg-gray-300 text-red-500 font-bold px-5 py-2 rounded-md text-xs absolute  top-3 right-3 border border-gray-400 cursor-pointer"
      >
        Cancel
      </button> */}

      {/* Share icon */}
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

      {/* Booking Information */}
      <div className="flex justify-between items-start p-3">
        <div className="space-y-2">
          <h1 className="text-xs md:text-sm font-semibold">
            {item?.activityId?.title}
          </h1>
          <p className="text-secondary text-xs">
            {moment(item?.date).format('ll')}
          </p>
          <div className="flex  items-center ">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item?.status === 'approved'
                  ? 'bg-green-200 text-green-800'
                  : item?.status === 'pending'
                    ? 'bg-yellow-200 text-blue-500'
                    : 'bg-red-200 text-red-800'
              }`}
            >
              {item?.status}
            </span>
          </div>
        </div>

        <div>
          {/* Reschedule modal */}
          <RescheduleModal
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dates={futureDates}
            booking={bookingReschduling}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>

      {/* Status Display */}
    </div>
  );
};

export default ScheduleCard;
