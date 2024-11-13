import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import RatedStudents from '@/components/Pages/RateStudents/RatedStudents';
import RateStudents from '@/components/Pages/RateStudents/RateStudents';
import SearchByName from '@/components/Pages/RateStudents/SearchByName';
import React from 'react';

const page = () => {
  return (
    <ProtectedPage role={['host']}>

    <div className="sm:p-10 p-6">
      <div className="flex sm:flex-row flex-col-reverse gap-7  justify-between">
        <h2 className="sm:text-xl text-lg  font-medium">All Students</h2>
        <SearchByName/>
      </div>
      <RateStudents/>
      <RatedStudents/>
    </div>
    </ProtectedPage>
  );
};

export default page;
