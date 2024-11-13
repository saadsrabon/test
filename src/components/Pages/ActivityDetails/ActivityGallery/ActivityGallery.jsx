'use client';

import share from '@/assets/home/Product/share.png';
import ActivityHeader from '@/components/Pages/ActivityDetails/ActivityHeader/ActivityHeader';
import Container from '@/components/shared/Container/Container';
import { useToast } from '@/components/ui/use-toast';
import { getAccessToken } from '@/lib/auth/token';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
// import Slider from 'react-slick';
import { RWebShare } from 'react-web-share';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ActivityGallery = ({ data }) => {
  const { images, videos } = data;
  const { toast } = useToast();
  const [cookieData, setCookieData] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    try {
      const cookieValue = Cookies.get('name');
      if (cookieValue) {
        const data = JSON.parse(cookieValue);
        setCookieData(data);
        if (
          data &&
          data._id &&
          data._id === data.favouritedBy?.find((id) => id === data._id)
        ) {
          setIsFavorited(true);
        }
      } else {
        console.log('Cookie not found');
      }
    } catch (error) {
      console.error('Failed to parse cookie:', error);
      // You can set a default value if parsing fails
      setCookieData({});
    }
  }, [data]);

  const GalleryJustImage = [
    ...(videos?.length
      ? videos.map((video, index) => ({
          id: images?.length ? images.length + index + 1 : index + 1,
          img: video,
          type: 'video',
        }))
      : []),
    ...(images?.length
      ? images.map((image, index) => ({
          id: index + 1,
          img: image,
          type: 'image',
        }))
      : []),
  ];
  const AddToFavorite = async () => {
    const token = getAccessToken();
    // console.log(token)
    // console.log(cookieData._id)
    // console.log(data._id)
    console.log('hello');
    try {
      const result = await axios.post(
        `https://api.elplanes.com/api/v1/favorite/addToFavorite/${cookieData._id}`,
        {
          activity_id: data._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log(result.data);
      toast({
        title: 'Added to favorites',
      });
      setIsFavorited(true);
    } catch (err) {
      toast({
        title: "Couldn't add to favorites",
      });
    }
  };
  const RemoveFromFavorites = async () => {
    const token = getAccessToken();
    // console.log(token)
    // console.log(cookieData._id)
    // console.log(data._id)
    console.log('hello');
    try {
      const result = await axios.delete(
        `https://api.elplanes.com/api/v1/favorite/remove/${cookieData._id}`,
        {
          activity_id: data._id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log(result.data);
      toast({
        title: 'Remove from favourites',
      });
      console.log(result.data);
      setIsFavorited(false);
    } catch (err) {
      toast({
        title: "Couldn't remove from favorites",
      });
      console.log(err);
    }
  };
  return (
    <div>
      {/* Gallery for large device  controlling with grid */}
      <Container>
        <div className="hidden  lg:grid grid-cols-4 grid-rows-2 gap-3 h-[500px]  rounded-3xl  overflow-hidden mb-10">
          {GalleryJustImage?.map((per, idx) => (
            <div
              className={`relative  h-full ${idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
              key={idx}
            >
              {/* If the type is image then will render image  */}
              {per?.type === 'image' ? (
                <Image
                  width={100}
                  className={`w-full h-full object-cover`}
                  src={per?.img}
                  height={100}
                  alt={`a1${idx + 1}`}
                />
              ) : (
                // else will render image that has play button upon clicking on it video will open in a modal
                <video
                  className="w-full h-full"
                  // width="320"
                  // height="240"
                  controls
                  onClick={(e) => {
                    e.target.play();
                  }}
                  onPlay={(e) => {
                    const videos = document.querySelectorAll('video');
                    videos.forEach((video) => {
                      if (video !== e.target) video.pause();
                    });
                  }}
                >
                  <source src={per.img} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      </Container>
      {/* Gallery for small and medium device controlling with slider  */}
      <div className="grid grid-cols-1 lg:hidden ">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="flex mySwiper"
          observer={true} // Observe mutations
          observeParents={true} // Reinitialize on parent change
          onSlideChange={(swiper) => {
            // Pause video on slide change
            swiper.slides.forEach((slide) => {
              const video = slide.querySelector('video');
              if (video) video.pause();
            });
          }}
        >
          {GalleryJustImage?.map((per, idx) => (
            <SwiperSlide key={idx}>
              <div className={`relative object-cover h-full`}>
                <div>
                  {/* Bookmark and share icon */}
                  <div>
                    <div className="absolute cursor-pointer top-[20px] right-3 text-lg bg-white p-2 rounded-full">
                      {isFavorited ? (
                        <GoHeartFill
                          onClick={RemoveFromFavorites}
                          className="text-primary z-10"
                        />
                      ) : (
                        <GoHeart onClick={AddToFavorite} className="z-10" />
                      )}
                    </div>
                    {/* Favorited */}
                    <RWebShare
                      data={{
                        text: 'For better lifestyle take session from here',
                        url: 'https://lms-colombia-client.vercel.app/',
                        title: 'Sparktivity',
                      }}
                    >
                      {/* Activity image */}
                      <div className="absolute cursor-pointer top-[20px] right-14 p-2 rounded-full bg-white">
                        <Image alt="share" src={share} />
                      </div>
                    </RWebShare>
                  </div>
                  {per.type === 'image' ? (
                    <Image
                      className="w-full h-[200px]"
                      src={per.img}
                      alt={`a1${idx + 1}`}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <video
                      className="w-full h-[200px]"
                      width="320"
                      height="240"
                      controls
                      onClick={(e) => {
                        e.target.play();
                      }}
                      onPlay={(e) => {
                        const videos = document.querySelectorAll('video');
                        videos.forEach((video) => {
                          if (video !== e.target) video.pause();
                        });
                      }}
                    >
                      <source src={per.img} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" lg:hidden">
        <ActivityHeader data={data} />
      </div>
    </div>
  );
};

export default ActivityGallery;
