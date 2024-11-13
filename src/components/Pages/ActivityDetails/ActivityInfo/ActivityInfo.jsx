import Container from '@/components/shared/Container/Container';
import { convertAgeRange, ConvertDatesInFromate } from '@/lib/ConvertAgeRange';
import { BsCalendar4Event } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { LuActivity } from 'react-icons/lu';
import { MdPets } from 'react-icons/md';
import { PiSeatLight } from 'react-icons/pi';
import { TiCancelOutline } from 'react-icons/ti';

const ActivityInfo = ({ data }) => {
  const {
    duration,
    title,
    ageGroup,
    totalMensCanJoin,
    totalWomansCanJoin,
    activityType,
    petsWelcome,
    futureDates,
    pricesPlan,
  } = data;
  // const value =  ? convertAgeRange(ageGroup) :'Could not get'
  const hello = ConvertDatesInFromate(futureDates);
  console.log(hello);
  const infos = [
    {
      title: 'How long is the activity',
      icon: <LuActivity />,
      details: `${duration} of ${title}`,
    },
    {
      title: 'Age group of people',
      icon: <GoPeople />,
      details: convertAgeRange(ageGroup),
    },
    // {
    //   title: 'How many people can join',
    //   icon: <MdPeopleOutline />,
    //   details: `${totalMensCanJoin} Men / ${totalWomansCanJoin} Women`,
    // },
    // {
    //   title: 'Spots Available',
    //   icon: <PiSeatLight />,
    //   details: `${totalMensCanJoin} Men / ${totalWomansCanJoin} Women`,
    // },
    {
      title: 'Activity in',
      icon: <LuActivity />,
      details: activityType,
    },
    {
      title: 'Pets Welcome',
      icon: <MdPets />,
      details: petsWelcome
        ? 'You can bring your pet'
        : "You can't bring your pet",
    },
    {
      title: 'Cancelation policy',
      icon: <TiCancelOutline />,
      details: 'Read our Cancelation Policy here',
    },
    {
      title: 'Up-Coming Activities',
      icon: <BsCalendar4Event />,
      details: hello ? hello : 'No future dates available',
    },
  ];
  return (
    <Container>
      <div className="mt-20 mb-10">
        <hr />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 ">
        {infos.map((info, idx) => (
          <div key={idx} className="flex  gap-4 justify-start  items-start">
            <p className="mt-1">{info.icon}</p>
            <div className="space-y-2">
              <h4 className="text-xs md:text-sm text-slate-800 font-medium">
                {info.title}
              </h4>
              <p className="text-secondary text-[10px] md:text-xs">
                {info.details}
              </p>
            </div>
          </div>
        ))}
        {/* Spots Available */}
        <div className="flex  gap-4 justify-start  items-start">
          <p className="mt-1">
            <PiSeatLight />
          </p>
          <div className="space-y-2">
            <h4 className="text-xs md:text-sm text-slate-800 font-medium">
              Spots Available
            </h4>
            <p className="text-secondary text-[10px] md:text-xs">
              {pricesPlan?.map((item, idx) => (
                <span key={idx}>
                  {item?.available} {item?.pricing_category}{' '}
                  <span
                    className={`${idx == pricesPlan?.length - 1 ? 'hidden' : ''}`}
                  >
                    {` / `}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-20">
        <hr />
      </div>
    </Container>
  );
};

export default ActivityInfo;
