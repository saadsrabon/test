import React from 'react';
import PreviewHeader from './PreviewHeader';
import ActivityGallery from '../ActivityDetails/ActivityGallery/ActivityGallery';
import ActivityHost from '../ActivityDetails/ActivityHost/ActivityHost';
import ActivityOverview from '../ActivityDetails/ActivityOverview/ActivityOverview';
import AboutActivities from '../ActivityDetails/AboutActivities/AboutActivities';
import Address from '../ActivityDetails/Address/Address';
import ActivityProducts from '../ActivityDetails/ActivityProducts/ActivityProducts';
import ActivityInfo from '../ActivityDetails/ActivityInfo/ActivityInfo';
import ClassRules from '../ActivityDetails/ClassRules/ClassRules';
import ActivityHeader from '../ActivityDetails/ActivityHeader/ActivityHeader';
import ActivityOrder from '../ActivityDetails/ActivityOrder/ActivityOrder';
import ActivityTestimonial from '../ActivityDetails/ActivityTestimonial/ActivityTestimonial';
import RelatedActivities from '../ActivityDetails/RelatedActivities/RelatedActivities';
import PostNewActivityTItle from './PostNewActivityTItle';
import Container from '@/components/shared/Container/Container';
import { useCreateActivityMutation } from '@/store/activity/activity';
import { getUser } from '@/lib/auth/token';
import { formatDates } from '@/utils/formatDates';
import { makePayload } from '@/utils/makePayload';
import { useToast } from '@/components/ui/use-toast';
import { useGetPricingQuery } from '@/store/services/pricingCategoryApiService';


const Preview = ({ setStep, num, activityData: data }) => {

  const [createActivity, { data: createdActivity, isLoading, isError }] = useCreateActivityMutation();


  const {
    host,
    images,
    videos,
    title,
    date,
    time,
    activityType,
    duration,
    ageGroup,
    totalPeopleCanJoin,
    totalWomansCanJoin,
    totalMensCanJoin,
    petsWelcome,
    whatsIncluded,
    about,
    strategy,
    bookingClosingTime,
    country,
    department,
    city,
    mapLink,
    fullAddress,
    fullAddress2,
    noteAboutLocation,
    attendeesBring,
    rules,
    whoCantAttend,
    minPeople,
    prices,
    bookingCancelationTime,
    profileCompleteRequired,
    attendeesList,
    status,
    cancellingReason,
    avgRating,
    ratings,
    futureDates,
    noteAboutActivityLocation,
    ageFrom,
    ageTo,
    pricesPlan,
    priceForAdult,
    priceForChild,
  } = data;

  const user = getUser()
  const { toast } = useToast();

  const formattedDates = formatDates(date, time);

  pricesPlan?.forEach(item => {
    item.available = item.total;
  })







  const payload = {
    host: user?._id,
    images: images,
    videos: videos,
    title: title,
    for: data?.for,
    date: formattedDates?.firstDate,
    time: time,
    activityType: activityType,
    duration: duration,
    ageGroup: `${ageFrom} - ${ageTo}`,
    totalPeopleCanJoin: totalMensCanJoin,
    totalWomansCanJoin: 0,
    totalMensCanJoin: 0,
    petsWelcome: petsWelcome === "Yes" ? true : false,
    whatsIncluded: whatsIncluded,
    about: about,
    strategy: strategy,
    bookingClosingTime: bookingClosingTime,
    country: country,
    department: department,
    city: city,
    mapLink: mapLink,
    fullAddress: fullAddress,
    fullAddress2: fullAddress2,
    noteAboutLocation: noteAboutLocation,
    attendeesBring: attendeesBring,
    rules: rules,
    whoCantAttend: whoCantAttend,
    minPeople: minPeople,
    prices: prices,
    // bookingCancelationTime: bookingCancelationTime,
    profileCompleteRequired, 
    attendeesList: attendeesList,
    status: status,
    cancellingReason: cancellingReason,
    avgRating: 0,
    ratings: [],
    // futureDates: formattedDates,
    futureDates: futureDates,
    noteAboutActivityLocation: noteAboutActivityLocation,
    ageFrom: ageFrom,
    ageTo: ageTo,
    pricesPlan: pricesPlan,
    priceForAdult: priceForAdult,
    priceForChild: priceForChild
  }

  const updatedPayload = makePayload(payload);

  const handleCreateActivity = async () => {

    console.log('updatedPayload', updatedPayload);
    const { data: res, error } = await createActivity(updatedPayload)

    if (error) {
      toast({
        variant: 'destructive',
        title: error?.data?.message,
      });
    } else {
      toast({
        title: "Your activity posted successfully",
      });
    }


    console.log("res", res, error);
  }


  return (

    <div className="overflow-x-hidden">
      <Container className="p-6 md:p-10">
        <PostNewActivityTItle num={num} setStep={setStep} >
          <button
            onClick={handleCreateActivity}
            // type="submit"
            className="flex items-center gap-3 px-10 py-3 text-base font-semibold text-white rounded-lg bg-primary w-max"
          >
            Submit
          </button>
        </PostNewActivityTItle>
      </Container>

      {profileCompleteRequired && <p className='container'>You required profile complition</p>}

      <div className="hidden lg:block">
        <ActivityHeader data={data} />
      </div>
      <ActivityGallery data={data} />
      <div className="flex xl:flex-row max-w-[1400px] mx-auto flex-col justify-between items-center lg:items-start">
        <div>
          <ActivityOverview data={data} />
          <AboutActivities data={data} map={mapLink} />
          <Address data={data} />
        </div>
        <div className="hidden lg:block">
          <ActivityOrder disabled={true} data={data} />
        </div>
      </div>
      {/* <ActivityProducts data={data} /> */}
      <ActivityInfo data={data} />
      <ActivityTestimonial data={data} />
      {/* <ActivityHost data={data} /> */}
      <ClassRules data={data} />
      {/* <RelatedActivities data={data} /> */}
      <div className="lg:hidden flex justify-center pb-[150px]">
        <ActivityOrder disabled={true} data={data} />
      </div>
    </div>

  );
};

export default Preview;