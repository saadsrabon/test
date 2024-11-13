import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import icon1 from '../../../assets/activityDetails/profile/1.png';
import icon2 from '../../../assets/activityDetails/profile/2.png';
import icon3 from '../../../assets/activityDetails/profile/3.png';
import profile from '../../../assets/activityDetails/profile/man.png';
import Socials from './Socials';

const HostProfile = ({ profileData }) => {
  const confirmed = [
    {
      title: 'Identity',
    },
    {
      title: 'Email Address',
    },
  ];
  return (
    <div className="mx-auto my-10 lg:mx-0">
      <div className="border rounded-xl border-[#DDDDDD] p-10 max-w-80 lg:w-80   space-y-10">
        <Image
          className="mx-auto"
          src={profileData?.profile_pic || profile}
          width={100}
          height={100}
          alt=""
        />

        <div className="space-y-5 ">
          <div className="flex items-center justify-start gap-5 ">
            <Image className="max-w-[20px]" src={icon1} width={100} alt="" />
            <h1 className="text-sm capitalize">{profileData?.user.role}</h1>
          </div>
          <div>
            <Link
              href="/my-profile/reviews"
              className="flex items-center justify-start gap-5"
            >
              <Image className="max-w-[20px]" width={100} src={icon2} alt="" />
              <h1 className="text-sm">
                {profileData?.user?.avg_rating} Reviews
              </h1>
            </Link>
          </div>
          <div className="flex items-center justify-start gap-5">
            <Image className="max-w-[16px]" width={100} src={icon3} alt="" />
            <h1 className="text-sm">
              Identify {!profileData?.user?.verified && 'is not'} verified
            </h1>
          </div>
          <div className="my-10">
            <hr />
          </div>
          {/* confirmation */}
          <div className="space-y-5">
            <h1 className="text-base font-semibold">
              {profileData?.user?.first_name} Goes confirmed
            </h1>
            <div className="space-y-5">
              {/* {confirmed?.map((data, idx) => ( */}
              {profileData?.user?.role === 'host' && (
                <div className="flex items-center justify-start gap-5 text-sm">
                  <CheckIcon className="text-gray-700 size-5" />
                  <p>Identity</p>
                </div>
              )}{' '}
              <p>
                {profileData?.user?.role !== 'host' &&
                  !profileData?.user?.email &&
                  'Noting confirmed'}
              </p>
              {profileData?.user?.email && (
                <div className="flex items-center justify-start gap-5 text-sm">
                  <CheckIcon className="text-gray-700 size-5" />
                  <p>Email Verified</p>
                </div>
              )}
              {/* ))} */}
            </div>
          </div>

          <div className="my-10">
            <hr />
          </div>
          {/* socials  */}
          <div>
            <Socials socials={profileData?.social_midea} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
