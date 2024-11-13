import Container from '@/components/shared/Container/Container';
import CalculateDistance from '@/lib/GetDistance';
import { convertTo12Hour } from '@/utils/Convert12Hour';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GoClock, GoPeople } from 'react-icons/go';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoCalendarClearOutline } from 'react-icons/io5';

const ActivityOverview = ({ data }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  useEffect(() => {
    const getTheDistance = async () => {
      const distance = await CalculateDistance(data.fullAddress, 'Khulna');
      setTotalDistance(distance.toFixed(2));
    };
    getTheDistance();
  }, [data.fullAddress]);
  console.log(totalDistance);
  return (
    <Container>
      <div className="flex flex-wrap justify-between gap-10 place-items-start ">
        <div className="flex items-start justify-center gap-5">
          <IoCalendarClearOutline className="mt-1 text-2xl" />
          <div>
            <h1 className="font-medium">Date</h1>
            <p className="text-sm text-secondary">
              {data?.futureDates?.length &&
                moment(data?.futureDates[0]?.date)?.format('MMMM Do YYYY')}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center gap-5">
          <GoClock className="mt-1 text-2xl" />
          <div>
            <h1 className="font-medium ">Time</h1>
            <p className="text-sm text-secondary">
              {data?.futureDates?.length && convertTo12Hour(data?.futureDates[0]?.time)}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center col-span-2 gap-5">
          <GoPeople className="mt-1 text-2xl" />
          <div>
            <h1 className="font-medium ">For whom</h1>
            <p className="text-sm text-secondary whitespace-nowrap">
              {data.for?.map((item, idx) => (
                <span key={idx}>
                  {item}{' '}
                  <span
                    className={`${idx == data.for?.length - 1 ? 'hidden' : ''}`}
                  >
                    ,
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center gap-5 ">
          <HiOutlineLocationMarker className="mt-1 text-2xl" />
          <div>
            <h1 className="font-medium ">Distance</h1>
            <p className="text-sm text-secondary whitespace-nowrap">
              {totalDistance} KM from your distance.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <hr />
      </div>
    </Container>
  );
};

export default ActivityOverview;
