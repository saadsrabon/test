'use client';
import Container from '@/components/shared/Container/Container';
import { ProductCardSlider } from '@/components/ui/Slider/ProductSlider';
import RatingCard from './RatingCard';

const ActivityTestimonial = ({ data }) => {
  const testimonials = [
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
    {
      name: 'Hanna',
      date: 'January 2023',
      timeline: '2 weeks ago',
      activities: 'Attended 2 activities',
      details:
        'We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.',
    },
  ];
  return (
    <Container>
      <div className={`${data?.ratings?.length > 0 ? '' : 'hidden'}`}>
        <h1 className="text-lg font-semibold">Some words from our audience</h1>
        <div className="">
          {/* className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" */}
          <ProductCardSlider
            data={data?.ratings}
            Component={RatingCard}
          ></ProductCardSlider>
        </div>
        {/* <div className="mt-10 ">
          <Link href="/my-profile/reviews">
            <button className="bg-tertiary text-white px-6 py-2 text-sm rounded-sm">
              View All
            </button>
          </Link>
        </div> */}
        <div className="my-10">
          <hr />
        </div>
      </div>
    </Container>
  );
};

export default ActivityTestimonial;
