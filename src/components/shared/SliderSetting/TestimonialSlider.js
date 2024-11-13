import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -left-9 top-[45%] z-20 flex size-8 -translate-y-1/2   items-center justify-center rounded-full border bg-white font-extrabold text-primary shadow-lg dark:bg-gray-800 md:-left-14 lg:size-10"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft className="text-2xl lg:text-3xl" />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -right-0 top-[45%] z-20 flex size-8 -translate-y-1/2  items-center justify-center rounded-full border bg-white font-extrabold  text-primary shadow-lg dark:bg-gray-800 md:right-16 lg:size-10"
      onClick={onClick}
    >
      <MdKeyboardArrowRight className="text-2xl lg:text-3xl" />
    </button>
  );
};

const testimonialSetting = {
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,

  responsive: [
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 932,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 762,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default testimonialSetting;
