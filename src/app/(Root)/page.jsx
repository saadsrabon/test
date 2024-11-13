'use client';

import Home from '@/components/Pages/Home/Home/Home';
import { useActivityQuery } from '@/store/activity/activity';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const query = useSelector((state) => state.filter.query);

  const { data: { data: activity } = [], isLoading } = useActivityQuery(query);

  // console.log(activity);

  return (
    <>
      <Home data={activity} isLoading={isLoading} />
      {/* <LocationModal /> */}
    </>
  );
};

export default MainPage;
