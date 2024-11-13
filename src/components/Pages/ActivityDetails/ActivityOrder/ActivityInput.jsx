const ActivityInput = ({ status = false, Name, data, PhoneNumber, Email }) => {
  return (
    <div className="flex flex-col  gap-2">
      <div>
        <div className="relative">
          {/* Label for phone number input */}
          <label className="block text-gray-700 mb-1 text-sm">
            {data?.type} Name
          </label>
          <input
            onChange={(e) => {
              Name(data.id, e.target.value);
            }}
            value={data.name}
            placeholder={`${status ? `Name` : `Name`}`}
            className="focus:outline-none border border-gray-300 w-full rounded-xl p-2 text-sm"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          {/* Label for phone number input */}
          <label className="block text-gray-700 mb-1 text-sm">
            {data?.type} Number
          </label>
          <input
            onChange={(e) => {
              PhoneNumber(data.id, e.target.value);
            }}
            value={data.phone}
            placeholder={`${status ? `Number` : `Number`}`}
            className="focus:outline-none border border-gray-300 w-full rounded-xl p-2 text-sm"
          />
        </div>
        <div className="relative">
          {/* Label for email input */}
          <label className="block text-gray-700 mb-1 text-sm">
            {data?.type} Email
          </label>
          <input
            onChange={(e) => {
              Email(data.id, e.target.value);
            }}
            value={data.userEmail}
            placeholder={`${status ? `Email` : `Email`}`}
            className="focus:outline-none border border-gray-300 w-full rounded-xl p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityInput;
