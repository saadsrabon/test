import React from 'react';
import profile from '@/assets/ratedStudents/profile.png'
import RatedStudentsCard from './RatedStudentsCard';
const RateStudents = () => {
    const RateStudentData = {
        profile :profile,
        name:'Rodrygo Goes'

    }
    return (
        <div className='grid xl:grid-cols-3 md:grid-cols-2 mt-16 grid-cols-1 gap-7'>
            {[1,4,53,4,534,3,4,35].map((item,idx)=>(
                <RatedStudentsCard edited={false} key={idx} data={RateStudentData}/>
            ))}
        </div>
    );
};

export default RateStudents;