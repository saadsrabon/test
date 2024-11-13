'use client';

import BookingDates from '@/components/Pages/MyCalendar/BookingDates';

const RescheduleModal = ({
  dates,
  selectedDate,
  setSelectedDate,
  booking,
  openModal,
  setOpenModal,
}) => {
  return (
    <div className="mx-auto w-fit">
      <button
        onClick={() => setOpenModal(true)}
        className="bg-tertiary text-white px-4 py-2 rounded-md text-xs"
      >
        Reschedule
      </button>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-300 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute space-y-3 max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-300'}`}
        >
          {dates?.map((itemData, idx) => (
            <div key={idx}>
              <BookingDates
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                data={itemData?.date}
              />
            </div>
          ))}

          <div className="flex justify-start mt-5">
            <button
              onClick={booking}
              className="bg-primary text-white px-5 py-2 rounded-md text-sm"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
