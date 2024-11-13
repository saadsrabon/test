import { useEffect, useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const GuestCategory = ({
  data,
  item,
  addPeople,
  allGuestData,
  removePeople,
  UpdatePrice,
}) => {
  const [guestNum, setGuestNum] = useState(0);

  useEffect(() => {
    const data = allGuestData?.filter((guest) => item?.type == guest?.type);
    setGuestNum(data?.length);
  }, [allGuestData, item?.type]);
  return (
    <div className="flex justify-between items-center">
      <div className="flex  gap-5">
        <h3 className="text-lg font-semibold">{item?.type}</h3>
        <p className="text-lg text-green-600">{item?.price}$</p>
      </div>
      <div className="flex gap-1 items-center">
        {guestNum <= 0 ? (
          <CiCircleMinus className={`text-3xl cursor-default text-gray-400`} />
        ) : (
          <CiCircleMinus
            onClick={() => {
              removePeople(item?.type);
              // UpdatePrice();
            }}
            className={`text-3xl cursor-pointer text-gray-600`}
          />
        )}

        <p className="text-xl w-[20px] text-center">{guestNum}</p>
        <CiCirclePlus
          // onClick={() => {
          //   UpdateNum(item.title, 'add');
          // }}
          onClick={() => {
            addPeople({
              id: allGuestData.length,
              // gift: false,
              phone: '',
              userEmail: '',
              paid: item?.price,
              name: '',
              // data: data?.date,
              // time: data.time,
              pricing_category: item.pricing_category,
              type: item.type,
              // reservedBy: '',
            });
          }}
          className="text-3xl cursor-pointer text-gray-600"
        />
      </div>
    </div>
  );
};

export default GuestCategory;
