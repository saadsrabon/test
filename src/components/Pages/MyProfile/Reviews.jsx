import ReviewModal from '@/components/shared/AllModals/ReviewModal';
import Image from 'next/image';
import profile from '../../../assets/activityDetails/activitytestimonial/profile.png';
import cover from '../../../assets/reviews/cover.png';
import Rating from '../ActivityDetails/ActivityTestimonial/Rating';

const Reviews = () => {
  const testimonials = [
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      img: profile,
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee. We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
  ];
  const totalReviews = 210;
  return (
    <div className="mt-10 mb-40">
      <h1 className="font-semibold text-xl">
        Reviews <span className="font-medium text-base">({totalReviews})</span>
      </h1>
      <div className="border rounded-md w-full p-5 flex justify-center items-center gap-10 mt-5 mb-20">
        <Image className="" src={cover} width={100} height={100} alt="" />
        <div className="space-y-5">
          <h1 className="text-xs md:text-lg font-bold">
            Give your feedback about how was Yoga Session with Ryan Isac
          </h1>
          <ReviewModal name="Write a reviews" className="bg-tertiary" />
        </div>
      </div>

      <div className="space-y-8">
        {testimonials?.map((data, idx) => (
          <div className=" pr-6 rounded-xl space-y-3" key={idx}>
            <div className="flex items-center">
              <Image src={data.img} width={100} height={100} alt="profile" />
              <div className="ml-4">
                <h1 className="text-sm font-semibold">{data.name}</h1>
                <p className="text-xs text-secondary">{data.date}</p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Rating />
              <span className="text-start -mt-2">.</span>
              <p className="text-[11px] md:text-xs"> {data.timeline} </p>
              <span className="text-start -mt-2">.</span>
              <p className="text-[11px]">{data.activities}</p>
            </div>
            <p className="text-sm max-w-[800px] mt-4">{data.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
