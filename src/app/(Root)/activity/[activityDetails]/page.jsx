'use client';

import AboutActivities from '@/components/Pages/ActivityDetails/AboutActivities/AboutActivities';
import ActivityGallery from '@/components/Pages/ActivityDetails/ActivityGallery/ActivityGallery';
import ActivityHeader from '@/components/Pages/ActivityDetails/ActivityHeader/ActivityHeader';
import ActivityHost from '@/components/Pages/ActivityDetails/ActivityHost/ActivityHost';
import ActivityInfo from '@/components/Pages/ActivityDetails/ActivityInfo/ActivityInfo';
import ActivityOrder from '@/components/Pages/ActivityDetails/ActivityOrder/ActivityOrder';
import ActivityOverview from '@/components/Pages/ActivityDetails/ActivityOverview/ActivityOverview';
import ActivityTestimonial from '@/components/Pages/ActivityDetails/ActivityTestimonial/ActivityTestimonial';
import ClassRules from '@/components/Pages/ActivityDetails/ClassRules/ClassRules';
import RelatedActivities from '@/components/Pages/ActivityDetails/RelatedActivities/RelatedActivities';
import Container from '@/components/shared/Container/Container';
import { setLocalData } from '@/lib/auth/token';

import axios from 'axios';

import { useEffect, useState } from 'react';

const ActivityDetails = ({ params }) => {
  const [id, setId] = useState(params.activityDetails);
  const [data, setData] = useState({});

  useEffect(() => {
    const FindActivityDetails = async () => {
      try {
        const result = await axios.get(
          `https://api.elplanes.com/api/v1/activity/single/${id}`
        );
        console.log(result.data.data);
        setData(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    FindActivityDetails();
  }, [id]);

  return (
    <Container>
      <div className="hidden lg:block">
        <ActivityHeader data={data} />
      </div>
      <ActivityGallery data={data} />
      <Container>
        <div className="flex flex-col items-center justify-between gap-10 xl:flex-row xl:items-start">
          <div className="xl:w-[calc(100%-360px)] w-full">
            <ActivityOverview data={data} />
            <AboutActivities data={data} />
            {/* <Address data={data} /> */}
          </div>
          <div className="xl:block hidden xsm:w-[360px] sticky top-60">
            <ActivityOrder data={data} />
          </div>
        </div>
      </Container>
      {/* <ActivityProducts data={data} /> */}
      <ActivityInfo data={data} />
      <ActivityTestimonial data={data} />
      <ActivityHost data={data} />
      <ClassRules data={data} />
      <div className="lg:hidden flex justify-center pb-[150px]">
        <ActivityOrder data={data} />
      </div>
      <RelatedActivities data={data} />
    </Container>
  );
};

export default ActivityDetails;
