import moment from 'moment';
const ActivityDetails = ({ ActivityOrderData, guestnum, date }) => {
  console.log(date);
  return (
    <div className="border-gray-400 border rounded-lg flex flex-col mt-6">
      <div className="flex ">
        <div className="p-3 border-r border-gray-400 w-[50%]">
          <h4 className="heading-5">DATE</h4>
          <p className="description-2">{moment(date).format('L')}</p>
        </div>
        <div className="p-3  w-[50%]">
          <h4 className="heading-5">TIME</h4>
          <p className="description-2">{moment(date).format('LT')}</p>
        </div>
      </div>
      <div className="border-t border-gray-400 p-3">
        <h4 className="heading-5">GUESTS</h4>
        <p className="description-2">{guestnum} guest</p>
      </div>
    </div>
  );
};

export default ActivityDetails;
