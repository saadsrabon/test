'use client';
import HostProfile from '@/components/Pages/MyProfile/HostProfile';
import ProfileDetails from '@/components/Pages/MyProfile/ProfileDetails';
import Container from '@/components/shared/Container/Container';
import { useGetProfileQuery } from '@/store/profile/profile';
import { useState } from 'react';

const ProfileId = ({ params }) => {
  const [id, setId] = useState(params.id);
  const { data, isLoading, isError, error } = useGetProfileQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  return (
    <div>
      {' '}
      <Container>
        <div className="flex flex-col items-start justify-around gap-20 lg:flex-row">
          <HostProfile profileData={data?.data} />
          <ProfileDetails edit={false} profileData={data?.data} />
        </div>
      </Container>
    </div>
  );
};

export default ProfileId;
