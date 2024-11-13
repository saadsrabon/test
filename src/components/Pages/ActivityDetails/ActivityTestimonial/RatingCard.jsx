import Rating from './Rating';

const RatingCard = ({ item }) => {
  return (
    <div
      className=" py-6 pr-6 pl-4 rounded-xl space-y-3 border min-w-[250px] max-w-[300px] "
      //   key={idx}
    >
      <div className="flex items-center">
        {/* <Image src={item.img} alt="profile" /> */}
        <div className="ml-4">
          <h1 className="text-sm font-semibold">{`${item?.user?.first_name} ${item?.user?.last_name}`}</h1>
          {/* <p className="text-xs text-secondary">{item.date}</p> */}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-start md:items-center md:gap-2">
        <Rating rate={item.rate} />
        {/* <span className="text-start -mt-2">.</span>
      <p className="text-[11px] md:text-xs"> {item.timeline} </p>
      <span className="text-start -mt-2">.</span> */}
        {/* <p className="text-[11px]">{item.activities}</p> */}
      </div>
      <p className="text-sm max-w-xs mt-4">{item?.review}</p>
    </div>
  );
};

export default RatingCard;
