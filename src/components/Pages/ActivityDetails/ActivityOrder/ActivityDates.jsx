const ActivityDates = ({ data, setSelectedDate, selectedDate }) => {
  const date = new Date(data.date);

  const day = date.getDate();
  //   const year = date.getFullYear();
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
        setSelectedDate(data.date);
      }}
      className={`flex cursor-pointer items-center justify-center  border rounded-full shadow-md py-[3px] px-[10px] bg-white ${data.date == selectedDate ? 'border-primary' : ''}`}
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

export default ActivityDates;
