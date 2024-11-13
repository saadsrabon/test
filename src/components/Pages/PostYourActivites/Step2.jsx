'use client';

import { useState, useEffect } from 'react';
import { GoArrowRight } from 'react-icons/go';
import PostNewActivityTItle from './PostNewActivityTItle';
import { useForm } from 'react-hook-form';
import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import TimeInput from '@/components/shared/StepInputs/TimeInput';
import TextInput from '@/components/shared/StepInputs/TextInput';
import { DateRange } from '@/components/shared/DateRange/DateRange';
import { addDays, format } from 'date-fns';

const Step2 = ({ setStep, idx, num, activityData, setActivityData }) => {

  console.log('step2', activityData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  // select States --------------
  // from: new Date(2022, 0, 20),
  // to: addDays(new Date(2022, 0, 20), 20),

  const [date, setDate] = useState(() => {
    if (activityData?.date) {
      return convertToDateRangeFormate(activityData.date);
    } // rest for edit
    // if (activityData?.futureDates) {
    //   return {
    //     from: activityData?.futureDates[0]?.date,
    //     to: (activityData?.futureDates?.length - 0).date,
    //   }
    // }
    return {
      from: new Date(),
      to: addDays(new Date(), 15),
    };
  });


  // const formattedDate = `${format(date?.from, "LLL dd, y")} - ${format(date?.to, "LLL dd, y")}`;
  const formattedDate = date?.from && date?.to
    ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
    : date?.from
      ? format(date.from, "LLL dd, y")
      : date?.to
        ? format(date.to, "LLL dd, y")
        : '';


  function convertToDateRangeFormate(dateRange) {
    const [startDateStr, endDateStr] = dateRange.split(" - ");
    const from = new Date(startDateStr);
    const to = new Date(endDateStr);

    to.setDate(to.getDate());
    to.setHours(0, 0, 0, 0);

    return { from, to };
  };



  const [activityType, setActivityType] = useState('')
  const [petsWelcome, setPetsWelcome] = useState('')
  const [bookingClosingTime, setBookingClosingTime] = useState('')


  // submit function --------

  const onSubmit = (data) => {

    const value = {
      ...data,
      date: formattedDate,
      activityType: activityType || activityData?.activityType,
      petsWelcome: petsWelcome || activityData?.petsWelcome,
      bookingClosingTime: bookingClosingTime || activityData?.bookingClosingTime,
    };

    setActivityData((prev) => ({ ...prev, ...value }))
    console.log('value', value);
    setStep(2);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const times = [
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
    '12:00 AM',
  ];
  const activityTypes = ["Indoor", "Outdoor"]
  const bookingClose = [
    "Before 3 hour", "Before 6 hour", "Before 12 hour", "Before 24 hour"
  ]





  return (
    <div key={idx} className="w-full p-6 overflow-hidden md:p-10">
      <PostNewActivityTItle num={num} setStep={setStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="py-20">
        {/* Date and time -------- */}
        <div className="mb-6">
          <h6 className="mb-8 text-xl font-semibold text-tertiary">
            Date and time
          </h6>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* <DatePicker register={register} name="activityDate" label="Date" /> */}
            {/* <div htmlFor="date" className="relative flex flex-col w-full gap-1 px-3 py-2 border border-slate-300 rounded-xl">
              <label className="text-[13px]">
                Date
              </label>
              <DateRange ></DateRange>
            </div> */}
            <DateRange date={date} setDate={setDate} >
              <div className="relative flex flex-col w-full gap-1 px-3 py-2 border border-slate-300 rounded-xl">
                <label className="text-[13px]">
                  Date
                </label>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>mm/dd/yyyy</span>
                )}

              </div>
            </DateRange>
            <TimeInput defaultValue={activityData?.time} register={register} name="time" label="Time" />
          </div>
        </div>


        {/* Some more Info about the activity -------- */}

        <div className="mb-10 space-y-8">
          <h6 className="mb-8 text-xl font-semibold text-tertiary">
            Some More Info about the activity
          </h6>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <TextInput
              name="duration"
              label="How long is the activity"
              register={register}
              defaultValue={activityData?.duration}
              placeholder='ex. 12.3 hours, or 24 hours'

            />
            <ActivitySelect
              name="activityType"
              label="Activity Type"
              register={register}
              options={activityTypes}
              defaultValue={activityData?.activityType}
              setValue={setActivityType}
              className="z-10"
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ActivitySelect
              name="petsWelcome"
              label="Pets welcome"
              options={['Yes', 'No']}
              defaultValue={activityData?.petsWelcome}
              setValue={setPetsWelcome}
            />
            <ActivitySelect
              name="bookingClosingTime"
              label="When booking will close"
              options={bookingClose}
              defaultValue={activityData?.bookingClosingTime}
              setValue={setBookingClosingTime}
            />
          </div>
        </div>

        {/* next Button  */}

        <button
          type="submit"
          className="flex items-center gap-3 px-10 py-3 text-sm font-semibold text-white rounded-lg bg-primary w-max"
        >
          Next{' '}
          <span>
            <GoArrowRight className="text-[24px]" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Step2;
