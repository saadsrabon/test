const BookingDates = ({ data, setSelectedDate, selectedDate }) => {
  const date = new Date(data);
  const day = date.getDate();
  //   const year = date.getFullYear();
  console.log(day);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  return (
    <div
      onClick={() => {
        setSelectedDate(data);
      }}
      className={`flex cursor-pointer items-center justify-center h-[45px] border rounded-full shadow-md py-[3px] px-[10px] bg-white ${data == selectedDate ? 'border-primary' : ''}`}
    >
      <div className=" inline-flex items-center justify-center   ">
        <div className="text-center">
          <div className={`text-sm font-bold text-gray-800`}>{day}</div>
          <div className={`text-[10px] font-medium text-gray-600 uppercase`}>
            {month}
          </div>
          {/* <div className={`text-[11px] text-gray-500`}>{year}</div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingDates;
