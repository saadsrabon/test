import { cn } from '@/lib/utils';
import Image from 'next/image';
import icon1 from '../../../assets/activityDetails/profile/1.png';
import icon2 from '../../../assets/activityDetails/profile/2.png';
import icon3 from '../../../assets/activityDetails/profile/3.png';
const ProfileCard = ({
  profile,
  text,

  profession,
  reviews,
  identity,
  className,
}) => {
  return (
    <div className="mx-auto lg:mx-0">
      <div
        className={cn(
          'border rounded-xl border-[#9f7c7c] p-10 max-w-80 lg:w-80  space-y-10',
          className
        )}
      >
        <Image
          width={100}
          height={100}
          className="mx-auto rounded-full"
          src={profile}
          alt=""
        />
        {/* <p className="text-center underline text-sm">{text}</p> */}
        <div className="space-y-5 ">
          <div className="flex justify-start items-center gap-5 ">
            <Image
              className="max-w-[20px]"
              width={100}
              height={100}
              src={icon1}
              alt=""
            />
            <h1 className="text-sm">{profession}</h1>
          </div>
          <div className="flex justify-start items-center gap-5">
            <Image
              className="max-w-[20px]"
              width={100}
              height={100}
              src={icon2}
              alt=""
            />
            <h1 className="text-sm">{reviews}</h1>
          </div>
          <div className="flex justify-start items-center gap-5">
            <Image
              className="max-w-[16px]"
              width={100}
              height={100}
              src={icon3}
              alt=""
            />
            <h1 className="text-sm">{identity}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
