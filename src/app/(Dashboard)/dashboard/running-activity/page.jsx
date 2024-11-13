import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import RunningActivities from '@/components/Pages/RunningActivities/RunningActivities';
import React from 'react';

const page = () => {
    return (
        <ProtectedPage role={['host', 'admin']}>
        <div className='sm:p-10 p-6'>
              <h2 className="sm:text-xl text-lg  font-medium">Running Activities</h2>
            <RunningActivities/>
            </div>
        </ProtectedPage>
    );
};

export default page;