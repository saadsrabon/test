import EarningActivity from '@/components/Pages/Earnings/EarningActivity';
import EarningBox from '@/components/Pages/Earnings/EarningBox';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import { Button } from '@/components/ui/button';
import React from 'react';

const page = () => {
  return (
    <ProtectedPage role={['host']}>
    <div className="sm:p-10 p-6">
      <h2 className="sm:text-xl text-lg  font-medium">Earnings</h2>
      {/* Funds and earnings */}
         <EarningBox/>
         <EarningActivity/>
         
      </div>
    </ProtectedPage>
  );
};

export default page;
