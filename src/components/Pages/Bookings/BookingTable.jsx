'use client';

import TableHeading from '@/components/shared/Table/TableHeading';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { useHostAttendenceQuery } from '@/store/activity/activity';
import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import { useEffect, useState } from 'react';
import BookingBody from './BookingBody';

const BookingTable = () => {
  // const { data } = useHostAttendenceQuery();
  // // console.log(data);
  const [activityNames, setActivityNames] = useState([]);
  const [select, setSelect] = useState('');
  const [activityData, setActivityData] = useState([]);
  const [selectedActivity, setselectedActivity] = useState({});
  useEffect(() => {
    const GetData = async () => {
      try {
        const cookieValue = Cookies.get('name');
        if (cookieValue) {
          const cookie = JSON.parse(cookieValue);
          const getActivityData = await axios.get(
            `https://api.elplanes.com/api/v1/activity/host/${cookie._id}`
          );
          setActivityData(getActivityData?.data.data); // This will trigger the next useEffect

          const data = [...getActivityData?.data.data].map(
            (item) => item?.title
          );
          setActivityNames([...data]);
          setSelect(data[0]);
          console.log('selecteing', data[0]);
        } else {
          console.log('Cookie not found');
        }
      } catch (err) {
        console.log(err);
      }
    };

    GetData();
  }, []);

  // New useEffect to call GetTheItemsBooking after activityData has been set
  useEffect(() => {
    if (activityData.length > 0 && select) {
      GetTheItemsBooking(select); // Now it will be called when activityData is available
    }
  }, [activityData, select]); // Run when either activityData or select changes

  const GetTheItemsBooking = async (selected) => {
    const findActivityId = activityData.find((item) => item?.title == selected);
    console.log('TowData', activityData, selected);
    console.log('Find the activity', findActivityId);
    setselectedActivity(findActivityId);
  };
  return (
    <>
      <div className="flex justify-between sm:flex-row flex-col gap-10 ">
        <div>
          <h1 className="text-xl ">Manage bookings</h1>
        </div>
        <ActivitySelect
          className="max-w-[200px]"
          options={activityNames}
          defaultValue={select}
          setValue={setSelect}
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <div className="min-w-max sm:min-w-max mt-5">
          {/* Currency Table */}
          <table className="  w-full ">
            <thead className="bg-gray-100 border-2 border-gray-200 ">
              <tr className="text-start">
                <TableHeading text={'User'} />
                <TableHeading text={'Activity'} />
                <TableHeading text={'Booking Date'} />
                <TableHeading text={'Total'} />
                {/* <TableHeading text={'Payment Status'} /> */}
                <TableHeading text={'Action'} className={'text-center'} />
              </tr>
            </thead>
            <BookingBody
              id={selectedActivity?._id}
            />
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingTable;
