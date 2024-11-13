'use client';

import ProductCard from '@/components/shared/Card/ProductCard';
import { useActivityQuery } from '@/store/activity/activity';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import chat from '../../../assets/activityDetails/profile/chat.png';
import heart from '../../../assets/activityDetails/profile/heart.png';
import home from '../../../assets/activityDetails/profile/home.png';

const ProfileDetails = ({ profileData, edit = true }) => {
  const { data: activity } = useActivityQuery();

  const info = [
    {
      icon: home,
      title: profileData?.address,
    },
    {
      icon: chat,
      title: profileData?.languages,
    },
    {
      icon: heart,
      title: profileData?.marital_status,
    },
  ];

  return (
    <div>
      <div className="space-y-12">
        <div className="mt-10">
          <h1 className="mb-2 text-xl font-semibold">
            Hi, I’m {profileData?.user?.first_name}{' '}
          </h1>
          <p className="text-xs text-secondary">
            Joined {moment(profileData?.user?.createdAt).format('YYYY')}
          </p>
        </div>
        {edit && (
          <div>
            <Link href="/edit-profile" className="text-xs underline">
              Edit profile
            </Link>
          </div>
        )}

        <div className="space-y-10">
          {/* about me */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="text-sm text-wrap lg:max-w-[850px]">
              {profileData?.about} <br />
              <span className="text-primary">Show More</span>
            </p>
          </div>
          <div className="space-y-5 ">
            {info.map((data, idx) => (
              <div
                key={idx}
                className="flex items-center justify-start gap-5 text-sm"
              >
                <Image
                  className="max-w-[20px]"
                  width={100}
                  src={data.icon}
                  alt=""
                />
                <p>{data.title}</p>
              </div>
            ))}
          </div>
          <div className="my-10">
            <hr />
          </div>
          {/* Activities Cards */}
          <div className="">
            <h1 className="text-xl font-semibold">Activities </h1>
            <div className="grid grid-cols-1 gap-10 mt-10 mb-40 md:grid-cols-2 lg:grid-cols-3">
              {activity?.data.map((item, _id) => (
                <ProductCard item={item} key={_id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
