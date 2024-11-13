'use client';

import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import TextInput from '@/components/shared/StepInputs/TextInput';
import { getGoogleMapUrl } from '@/utils/getGoogleMapUrl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowRight } from 'react-icons/go';
import PostNewActivityTItle from './PostNewActivityTItle';

const Step3 = ({ setStep, idx, num, activityData, setActivityData }) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // select states
  const [activityCountry, setActivityCountry] = useState('');
  const [activityDepartment, setActivityDepartment] = useState('');
  const [map, setMap] = useState(activityData?.mapLink || '');

  // submit function --------

  const onSubmit = (data) => {
    const value = {
      ...data,
      country: activityCountry || activityData?.country,
      department: activityDepartment || activityData?.department,
      mapLink: getGoogleMapUrl(map),
    };

    setActivityData((prev) => ({ ...prev, ...value }))
    setStep(3);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const city = watch('city');
  const address = watch('fullAddress');

  const handleGoogleMap = () => {
    setMap(`${activityCountry},${city},${address}`);
  };


  const country = ['Bangladesh', 'Japan', 'Korea'];
  const department = ['Yoga', 'Music', 'Karate'];

  return (
    <div key={idx} className="w-full p-6 overflow-hidden md:p-10">
      <PostNewActivityTItle num={num} setStep={setStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="py-20">
        {/* Fill the address where activity will he held -------- */}

        <div className="mb-6">
          <h6 className="mb-8 text-xl font-semibold text-tertiary">
            Fill the address where activity will he held
          </h6>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ActivitySelect
              className="z-30"
              options={country}
              label="Country"
              defaultValue={activityData?.country}
              setValue={setActivityCountry}
              name="activityCountry"
            />
            <ActivitySelect
              className="z-20"
              options={department}
              label="Department"
              defaultValue={activityData?.department}
              setValue={setActivityDepartment}
              name="activityDepartment"
            />

            <TextInput
              placeholder="Choose your city"
              register={register}
              defaultValue={activityData?.city}
              name="city"
              label="City"
            />

            <TextInput
              register={register}
              defaultValue={activityData?.fullAddress}
              name="fullAddress"
              label="Type Full Address"
            />
            <TextInput
              register={register}
              defaultValue={activityData?.fullAddress2}
              name="fullAddress2"
              label="Complementary Address Information"
            />
          </div>
          <div className="items-center gap-6 py-5 md:flex md:py-8 ">
            <h6 className="mb-5 font-semibold md:text-xl text-tertiary md:mb-0">
              Please Confirm that this is the place where the activity will take
              place
            </h6>

            <div>
              <button
                type='button'
                onClick={handleGoogleMap}
                className="border-[2px] cursor-pointer border-primary text-primary hover:text-primary px-8 text-sm font-semibold py-2.5 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
          <div className="py-8">
            {map && (
              <iframe
                className="sm:h-[450px] w-full h-full rounded-md"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={getGoogleMapUrl(map)}
              />
            )}
          </div>

          <TextInput
            required={false}
            register={register}
            defaultValue={activityData?.noteAboutActivityLocation}
            name="noteAboutActivityLocation"
            label="Enter note about the location"
          ></TextInput>
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

export default Step3;