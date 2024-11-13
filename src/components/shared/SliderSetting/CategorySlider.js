import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -left-0 top-[35%] z-20 flex size-6 -translate-y-1/2   items-center justify-center rounded-full  bg-white font-extrabold text-primary shadow-lg dark:bg-gray-800 md:-left-0 lg:size-8 xl:size-8"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft className="text-2xl " />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute -right-0 top-[35%] z-20 flex size-6 -translate-y-1/2  items-center justify-center rounded-full  bg-white font-extrabold  text-primary shadow-lg dark:bg-gray-800 md:-right-0 lg:size-8 xl:size-8"
      onClick={onClick}
    >
      <MdKeyboardArrowRight className="text-2xl " />
    </button>
  );
};

const setting = {
  infinite: false,
  speed: 300,
  slidesToShow: 10,
  slidesToScroll: 1,
  autoplay: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,

  responsive: [
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 932,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 762,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};
export default setting;
