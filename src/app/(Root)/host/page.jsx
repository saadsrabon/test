import ActivityHost from '@/components/Pages/ActivityDetails/ActivityHost/ActivityHost';
import RelatedActivities from '@/components/Pages/ActivityDetails/RelatedActivities/RelatedActivities';
import React from 'react';

const page = () => {
  return (
    <div>
      <ActivityHost />
      <RelatedActivities />
    </div>
  );
};

export default page;
