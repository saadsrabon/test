import PastActivities from '@/components/Pages/PastActivities/PastActivities';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import React from 'react';

const page = () => {
    return (
        <ProtectedPage role={['host']}>
        <div className='sm:p-10 p-6'>
              <h2 className="sm:text-xl text-lg  font-medium">Past Activities</h2>
            <PastActivities/>
        </div>
        </ProtectedPage>
        
    );
};

export default page;