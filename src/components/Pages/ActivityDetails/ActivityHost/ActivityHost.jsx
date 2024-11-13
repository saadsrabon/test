'use client';
import ProfileCard from '@/components/shared/Card/ProfileCard';
import Container from '@/components/shared/Container/Container';
import { useEffect, useState } from 'react';
// import profileImg from '../../../../assets/activityDetails/profile/man.png';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import chat from '../../../../assets/activityDetails/profile/chat.png';
import heart from '../../../../assets/activityDetails/profile/heart.png';
import home from '../../../../assets/activityDetails/profile/home.png';

const ActivityHost = ({ data }) => {
  const [hostData, setHostData] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    const GetHostProfile = async () => {
      try {
        const result = await axios.get(
          `https://api.elplanes.com/api/v1/profile/${data?.host?._id}`
        );
        if (result.data.data) {
          setHostData(result.data.data);
          console.log(result.data.data);
        }
      } catch (err) {
        // toast({
        //   title: err?.data?.message,
        // });
        console.log(err);
      }
    };
    GetHostProfile();
  }, [data?.host?._id, toast]);

  const profileData = [
    {
      icon: home,
      title: `Lives in ${hostData?.address}`,
    },
    {
      icon: chat,
      title: `Speaks ${hostData?.languages?.map((item) => item)} `,
    },
    {
      icon: heart,
      title: `${hostData?.marital_status}`,
    },
  ];
  console.log(data?.host?._id);
  return (
    <Container>
      <div>
        <h1 className="text-xl font-semibold my-10">About the Host </h1>
        <Link
          href={`/profile/${data?.host?._id}`}
          className="flex flex-col md:flex-row gap-10 justify-between items-start"
        >
          <ProfileCard
            profile={hostData?.profile_pic}
            // text="Update photo"
            profession="Host"
            reviews={`${hostData?.user?.rating?.length} Reviews`}
            identity="Identify Verified"
          />
          <div className="space-y-5">
            <div className="mt-10">
              <h1 className="text-xl font-semibold mb-2">
                Hi, I’m{' '}
                {`${hostData?.user?.first_name} ${hostData?.user?.last_name}`}{' '}
              </h1>
              <p className="text-xs text-secondary">
                Joined {moment(hostData?.createdAt).format('YYYY')}
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-5">
                <h2 className="text-xl font-semibold">About Me</h2>
                <p className="text-sm text-wrap lg:max-w-[850px]">
                  {hostData?.about}
                </p>
              </div>
              <div className="space-y-5 ">
                {profileData?.map((data, idx) => (
                  <div
                    key={idx}
                    className="flex justify-start items-center gap-5 text-sm"
                  >
                    <Image className="max-w-[20px]" src={data.icon} alt="" />
                    <p>{data.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
        <div className="my-16">
          <hr />
        </div>
      </div>
    </Container>
  );
};

export default ActivityHost;
