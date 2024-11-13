import BookingTable from '@/components/Pages/Bookings/BookingTable';
import DashboardServey from '@/components/Pages/Dashboard/DashboardServey';
import React from 'react';
import profile from '@/assets/booking/profile.png';

import RatedStudentsCard from '@/components/Pages/RateStudents/RatedStudentsCard';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
const page = () => {
  const RateStudentData = {
    profile: profile,
    name: 'Rodrygo Goes',
  };

  return (
    <ProtectedPage role={['host']}>
    <div className="p-6 sm:p-10">
      <h2 className="mb-10 text-lg font-medium sm:text-xl ">Dashboard</h2>
      <DashboardServey />
      <h2 className="mt-16 mb-10 text-lg font-medium sm:text-xl">
        Recent Bookings
      </h2>
      <BookingTable />
      <h2 className="mt-16 mb-10 text-lg font-medium sm:text-xl">
        Recent Students
      </h2>
      <div className="grid grid-cols-1 mt-16 xl:grid-cols-3 md:grid-cols-2 gap-7">
        {[1, 4, 53, 5].map((item, idx) => (
          <RatedStudentsCard edited={false} key={idx} data={RateStudentData} />
        ))}
      </div>
      </div>
    </ProtectedPage>
  );
};

export default page;
