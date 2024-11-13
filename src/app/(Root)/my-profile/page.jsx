'use client';

import HostProfile from '@/components/Pages/MyProfile/HostProfile';
import ProfileDetails from '@/components/Pages/MyProfile/ProfileDetails';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';
import { useGetProfileQuery } from '@/store/profile/profile';
import { useSelector } from 'react-redux';


const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useGetProfileQuery(user?._id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  console.log(data?.data);
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
      <Container>
        <div className="flex flex-col items-start justify-around gap-20 lg:flex-row">
          <HostProfile profileData={data?.data} />
          <ProfileDetails profileData={data?.data} />
        </div>
      </Container>
    </ProtectedPage>
  );
};

export default MyProfile;