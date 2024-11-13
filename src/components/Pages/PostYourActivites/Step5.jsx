'use client';

import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import TextArea from '@/components/shared/StepInputs/TextArea';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowRight } from 'react-icons/go';
import PostNewActivityTItle from './PostNewActivityTItle';

const Step5 = ({ setStep, idx, num, activityData, setActivityData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // states ---------

  const [bookingCancelationTime, setBookingCancelationTime] = useState(activityData?.bookingCancelationTime || '');

  // submut function -------------

  const onSubmit = (data) => {
    const value = {
      ...data,
      bookingCancelationTime
      // activityAutomaticBooking,
    };
    console.log('value', value);

    setActivityData((prev) => ({ ...prev, ...value }))

    setStep(5);
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
  return (
    <div key={idx} className="w-full p-6 overflow-hidden border md:p-10">
      <PostNewActivityTItle num={num} setStep={setStep} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-5 "
      >
        {/* class rule ------- */}
        <h1 className="text-base font-semibold">
          Terms and Conditions of this specific activity
        </h1>
        <TextArea
          register={register}
          defaultValue={activityData?.rules}
          required={false}
          name="rules"
          className={'h-[150px]'}
        />
        {/* attend class ------- */}
        <h1 className="text-base font-semibold">
          Who should not attend this activity
        </h1>
        <TextArea
          register={register}
          defaultValue={activityData?.whoCantAttend}
          required={false}
          name="whoCantAttend"
          className={'h-[150px]'}
        />
        <h1 className="text-base font-semibold">
          Cancelling Reason
        </h1>
        <TextArea
          register={register}
          defaultValue={activityData?.cancellingReason}
          required={false}
          name="cancellingReason"
          className={'h-[150px]'}
        />
        {/* pricing ------------ */}
        {/* <h1 className="text-base font-semibold ">Pricing</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <TextInput
            register={register}
            name="activityPriceMen"
            label="Price for Men"
          />
          <TextInput
            register={register}
            name="activityPriceWomen"
            label="Price for Women"
          />
          <TextInput
            register={register}
            name="activityPriceChild"
            label="Price for Child"
          />
          <TextInput
            register={register}
            name="activityPriceCouple"
            label="Price for Couple"
          />
        </div> */}

        {/* <p className="text-xs font-semibold text-red-500 ">
          (Admin must be able to select minimum price user can type from
          dashboard)
        </p> */}

        {/* select options input for booking and policy */}
        {/* <div className="grid grid-cols-1 gap-10 md:grid-cols-2"> */}
        {/* <ActivitySelect
            label="Automatic Booking"
            options={times}
            last={true}
            setValue={setActivityAutomaticBooking}
            name="activityAutomaticBooking"
          /> */}

        {/* <ActivitySelect
          label="Booking Cancelation Time"
          defaultValue={activityData?.bookingCancelationTime}
          options={times}
          last={true}
          setValue={setBookingCancelationTime}
          name="bookingCancelationTime"
        /> */}
        {/* </div> */}
        {/* check box - Require Profile Completion */}
        {/* <div className="form-control">
          <label className="flex items-center cursor-pointer gap-x-4">
            <input
              value="Require Profile Completion"
              type="checkbox"
              className="w-6 h-6 rounded-full focus:rounded-full accent-black"
            />
            <span className="label-text text-[#1f1f1f] lg:md:text-[18px] text-[16px]">
              Require Profile Completion
            </span>
          </label>
        </div> */}
        {/* preview button */}
        <button
          type="submit"
          className="flex items-center gap-3 px-10 py-3 text-base font-semibold text-white rounded-lg bg-primary w-max"
        >
          Continue to see how your activity will look
          <span>
            <GoArrowRight className="text-[24px]" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Step5;