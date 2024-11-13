'use client';
import Container from '@/components/shared/Container/Container';
import  { settingActivity } from '@/components/shared/SliderSetting/ActivityProductSlider';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


const ActivityProducts = ({data}) => {



  return (
    <Container>
      <div className="my-10 font-bold">
        <h1 className=" mb-5">What is included</h1>
        <Slider {...settingActivity}>
          {data?.whatsIncluded?.map((data, idx) => (
            <div
              key={idx}
              className="max-w-[200px]  cursor-pointer rounded-sm  border border-slate-200"
            >
              <Image width={100} height={100} className="w-full" src={data.image} alt={`${data.title}`} />
              <h5 className="text-sm text-center  py-4">{data.title}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default ActivityProducts;
