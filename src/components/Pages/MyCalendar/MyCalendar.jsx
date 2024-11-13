'use client';
import ReviewCard from '@/components/shared/Card/MyCalendarCards/ReviewCard';
// import { Calendar } from '@/components/ui/calendar';

import ScheduleCard from '@/components/shared/Card/MyCalendarCards/ScheduleCard';
import { getUniqueDates } from '@/lib/utils';
import {
  useMybookingQuery,
  useMyPastbookingQuery,
} from '@/store/activity/activity';
import { useEffect, useState } from 'react';
import cover from '../../../assets/mycalendar/image.png';
import BookingDates from './BookingDates';

const MyCalendar = () => {
  const { data: bookingData } = useMybookingQuery();
  const { data: pastBooking } = useMyPastbookingQuery();
  console.info('this is data', pastBooking);
  const [datesData, setDatesData] = useState([]);
  const [selectedDate, setSelecteddate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState([]);
  const reviewInfo = [
    {
      image: cover,
      title: 'Yoga Session with Ryan',
      date: '14 May 2024',
      btn: 'Review',
    },
    {
      image: cover,
      title: 'Yoga Session with Ryan',
      date: '14 May 2024',
      btn: 'Rated',
    },
    {
      image: cover,
      title: 'Yoga Session with Ryan',
      date: '14 May 2024',
      btn: 'Review',
    },
    {
      image: cover,
      title: 'Yoga Session with Ryan',
      date: '14 May 2024',
      btn: 'Rated',
    },
  ];

  console.log(bookingData);
  useEffect(() => {
    const uniqueDates = getUniqueDates(bookingData?.data);
    {
      uniqueDates?.length && setDatesData([...uniqueDates]);
    }

    // setSelecteddate(uniqueDates[0]);
  }, [bookingData]);
  return (
    <div className="my-10">
      <div className="space-y-10">
        <h1 className="font-semibold text-xl">Upcoming Activities</h1>
        {/* calendar */}
        {bookingData?.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
            {/* <Calendar /> */}
            <div className="flex flex-wrap gap-3">
              {datesData?.map((itemData, idx) => (
                <BookingDates
                  key={idx}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelecteddate}
                  data={itemData}
                />
              ))}
            </div>
            {/* schedule card */}
            {bookingData?.data?.map((item, _id) => (
              <ScheduleCard key={_id} item={item} />
            ))}
          </div>
        ) : (
          <div className=" text-2xl text-center py-20">
            <h1>No Booking Available</h1>
          </div>
        )}

        <h1 className="font-semibold text-xl">Past Activities</h1>
        {/* review card */}

        {pastBooking?.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
            {/* schedule card */}
            {pastBooking?.data?.map((item, _id) => (
              <ReviewCard
                key={_id}
                text={'Review'}
                status={'rated'}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className=" text-2xl text-center py-20">
            <h1>No Booking Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
