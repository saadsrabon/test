import Image from 'next/image';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import img1 from '../../../assets/myProfile/myAccount/1.png';
import img2 from '../../../assets/myProfile/myAccount/2.png';
import img3 from '../../../assets/myProfile/myAccount/3.png';
import img4 from '../../../assets/myProfile/myAccount/4.png';

const MyAccount = () => {
  const accountInfo = [
    {
      image: img4,
      title: 'Dashboard',
      details: 'Directly go to your Host dashboard from here',
    },
    {
      image: img1,
      title: 'Personal Info',
      details: 'Please provide your contact details for further communication',
    },
    {
      image: img2,
      title: 'Login & Security',
      details: 'Update your password and secure your account',
    },
    {
      image: img3,
      title: 'Payments & Payouts',
      details: 'Review Payments, payouts, coupons, billing',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
      {accountInfo?.map((info, index) => (
        <div
          className={`border border-gray-200 rounded-lg px-5 py-8 my-10 ${index === 0 ? 'md:hidden' : ''}`}
          key={index}
        >
          <div className=" gap-3 space-y-4">
            <Image src={info?.image} width={100} alt="img" />
            <div className="space-y-5 ">
              <h1 className="text-lg font-semibold flex justify-start gap-3 items-center">
                {info?.title} <MdOutlineArrowForwardIos />
              </h1>
              <p className="text-sm ">{info?.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAccount;
