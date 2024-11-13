'use client';
import Container from '@/components/shared/Container/Container';
import { useMybookingQuery } from '@/store/activity/activity';
import { getGoogleMapUrl } from '@/utils/getGoogleMapUrl';
import { useEffect, useState } from 'react';

const AboutActivities = ({ data, map }) => {
  const [showLocation, setShowLocation] = useState(false);
  const { data: bookingData } = useMybookingQuery();
  console.log(bookingData);
  useEffect(() => {
    const findingBooking = async () => {
      const findData = bookingData?.data?.find(
        (item) => item?.activityId?._id == data?._id
      );
      if (findData) {
        setShowLocation(true);
      }
    };
    findingBooking();
  }, [bookingData?.data, data?._id]);
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">About the activities</h1>
        <p className="text-sm max-w-[900px]">
          {data?.about} <br />
          {/* <span className="text-primary">Show More</span> */}
        </p>
        <h2 className="font-semibold">
          How are you going to meet others attendees?
        </h2>
        <p className="text-sm max-w-[900px]">
          {data?.meetAttendees}
          {/* <span className="text-primary">Show More</span> */}
        </p>
        <h2 className="font-semibold">Where will be the activity?</h2>
        {showLocation ? (
          <p className="text-sm">{`${data?.country},${data?.city},${data?.fullAddress}`}</p>
        ) : (
          <p className="text-sm"> {`${data?.country},${data?.city}`}</p>
        )}

        <h2 className="font-semibold">What is include?</h2>
        <p className="text-sm max-w-[900px]">
          {data?.whatsIncluded}
          {/* <span className="text-primary">Show More</span> */}
        </p>
        {/* map */}
        {showLocation ? (
          <div>
            <iframe
              src={getGoogleMapUrl(
                `${data?.country},${data?.city},${data?.fullAddress}`
              )}
              width="600"
              height="450"
              className=" w-full rounded-lg  my-10"
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <div>
            <iframe
              src={getGoogleMapUrl(`${data?.country},${data?.city}`)}
              width="600"
              height="450"
              className=" w-full rounded-lg  my-10"
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        {showLocation && (
          <>
            <div className="space-y-3">
              <h1 className="font-bold">Address</h1>
              <p className="text-sm ">{data?.fullAddress}</p>
            </div>
            <div className="space-y-3">
              <h1 className="font-bold">Address Note</h1>
              <p className="text-sm ">{data?.noteAboutLocation}</p>
            </div>
          </>
        )}

        <div className="space-y-3">
          <h1 className="font-bold">What should you bring?</h1>
          <p className="text-sm ">{data?.attendeesBring}</p>
        </div>
      </div>
    </Container>
  );
};

export default AboutActivities;
