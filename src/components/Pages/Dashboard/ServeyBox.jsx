import React from 'react';

const ServeyBox = ({title='dashboard',servey=0}) => {
    return (
        <div className='p-6 border border-gray-300 w-full rounded-lg flex flex-col gap-4 bg-white'>
            <h2  className='font-medium'>{title}</h2>
            <h1 className='text-4xl font-semibold'>{servey}</h1>
        </div>
    );
};

export default ServeyBox;