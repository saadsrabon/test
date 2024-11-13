import React from 'react';
import RatedStudentsCard from './RatedStudentsCard';
import profile from '@/assets/ratedStudents/profile.png'
const RatedStudents = () => {
  const RateStudentData = {
    profile: profile,
    name: 'Rodrygo Goes',
  };
  return (
    <div>
      <div className="flex sm:flex-row flex-col-reverse gap-7 mt-10 justify-between">
        <h2 className="sm:text-xl text-lg  font-medium">Rated</h2>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 mt-16 grid-cols-1 gap-7">
        {[1, 4, 53, 4, 534, 3, 4, 35].map((item, idx) => (
          <RatedStudentsCard edited={true} key={idx} data={RateStudentData} />
        ))}
      </div>
    </div>
  );
};

export default RatedStudents;
