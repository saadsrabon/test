"use client";

import { GoArrowRight } from 'react-icons/go';
import PostNewActivityTItle from './PostNewActivityTItle';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/shared/StepInputs/TextInput';
import TextArea from '@/components/shared/StepInputs/TextArea';
import { useState, useEffect } from 'react';
import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import { useGetPricingQuery } from '@/store/services/pricingCategoryApiService';
import { formatDates } from '@/utils/formatDates';


const Step4 = ({ setStep, idx, num, activityData, setActivityData, targetAudience = [] }) => {

  const [selectedTypes, setSelectedTypes] = useState(activityData?.for || []);
  const [currency, setCurrency] = useState(activityData?.pricesPlan[0]?.currency || '');

  const { data: pricingCategory } = useGetPricingQuery();

  const pricing = (category) => pricingCategory?.data.find((pricing) => pricing.name === category)

  const minPrice = (category) => currency === 'USD' ? pricing(category)?.usaPrice : currency === 'EURO' ? pricing(category)?.europePrice : currency === 'COP' && pricing(category)?.colombiaPrice


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const commonCategories = [
    ...new Set(activityData?.pricesPlan?.map((plan) => plan.pricing_category))
  ];

  console.log(commonCategories);



  // submit function --------

  const onSubmit = (data) => {

    const value = {
      ...data, for: selectedTypes,
    };

    console.log({ ...data });

    const pricePlan = activityData.pricesPlan.map(plan => {
      return { ...plan, price: activityData[`${plan.pricing_category}Price`] || data[`${plan.pricing_category}Price`] }; // Set price to 40 for all
    });

    const types = activityData.pricesPlan.map(plan => {
      const total = activityData[`total${plan.pricing_category.charAt(0).toUpperCase() + plan.pricing_category.slice(1)}`] || data[`total${plan.pricing_category.charAt(0).toUpperCase() + plan.pricing_category.slice(1)}`]
      return { type: plan.type, total: total, available: total, pricing_category: plan.pricing_category }
    })

    const formattedDates = formatDates(activityData?.date, activityData?.time, types);

    setActivityData((prev) => ({
      ...prev, ...value,
      pricesPlan: pricePlan,
      // futureDates: [{
      //   date: activityData.date,
      //   time: activityData.time,
      //   types
      // }]
      futureDates: formattedDates?.futureDates,

    }));


    setStep(4); // Move this after checking for errors


  };



  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type.type)) {
      // If the type is already selected, remove it
      setSelectedTypes(selectedTypes.filter((t) => t !== type.type));
    } else {
      // Add the new type to selectedTypes
      setSelectedTypes([...selectedTypes, type.type]);
    }
  };



  // const handlePricingCategory = (type) => {
  //   handleCheckboxChange(type),
  //     setActivityData((prev) => ({
  //       ...prev,
  //       pricesPlan: [...(prev.pricesPlan || []),
  //         {
  //           type: type.type,
  //           pricing_category: type.pricing_category,
  //           currency: '',
  //           price: null,

  //         }
  //       ]
  //     }))
  // }
  const handlePricingCategory = (type) => {

    // Handle checkbox change
    handleCheckboxChange(type);

    setActivityData((prev) => {
      // Check if the type already exists in pricesPlan
      const typeExists = prev.pricesPlan?.some((plan) => plan.type === type.type);

      if (typeExists) {
        // If type exists, remove it from pricesPlan
        return {
          ...prev,
          pricesPlan: prev.pricesPlan.filter((plan) => plan.type !== type.type),
        };
      } else {
        // If type doesn't exist, add the new type to pricesPlan
        return {
          ...prev,
          pricesPlan: [
            ...(prev.pricesPlan || []),
            {
              type: type.type,
              pricing_category: type.pricing_category,
              currency: '',
              price: null,
            },
          ],
        };
      }
    });
  };




  const handleCurrencyChange = (selectedCurrency) => {

    console.log('console', activityData?.futureDates[0]?.types.find(type => type.type).total);
    setCurrency(selectedCurrency); // Update the currency state
    console.log('activityData', activityData);
    setActivityData((prev) => ({
      ...prev,
      pricesPlan: prev.pricesPlan.map(plan => ({
        ...plan,
        currency: selectedCurrency // Update each plan with the new currency
      }))
    }));
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []); // Ensure this runs once


  return (
    <div key={idx} className="w-full p-6 overflow-hidden md:p-10">
      <PostNewActivityTItle num={num} setStep={setStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="py-20">
        {/* Which is the target of the activity -------- */}

        <div className="mb-6">
          <h6 className="mb-8 text-xl font-semibold text-tertiary">
            What is the target of the activity
          </h6>

          {/* Target audience checkboxes  */}

          <div className="flex flex-wrap gap-8 pt-8 lg:gap-x-20">

            {targetAudience?.map((type, idx) => (
              <div key={type._id}>
                <label className="flex items-center cursor-pointer gap-x-4">
                  <input
                    type="checkbox"
                    name={`for[${idx}]`} // Using dynamic names for each checkbox
                    className="w-6 h-6 rounded-full focus:rounded-full accent-black"
                    onChange={() => handlePricingCategory(type)} // Call function to update state
                    checked={selectedTypes.includes(type.type)} // Check if the type is selected
                  />
                  {type.type}
                </label>
              </div>
            ))}

          </div>


          <div className="flex flex-wrap items-center pt-16 pb-8 gap-x-4 gap-y-2">
            <h5 className="text-xl text-[#091540] font-semibold">
              Profile Completion
            </h5>
            {/* <p className="font-medium text-slate-500">
              (You can select how many Men, Women or Total)
            </p> */}
          </div>

          <label
            className="flex items-center cursor-pointer gap-x-4"
          >
            <input
              type="checkbox"
              name="profileCompleteRequired" // The name of the field
              defaultChecked={activityData?.profileCompleteRequired}
              className="w-6 h-6 rounded-full focus:rounded-full accent-black"
              {...register('profileCompleteRequired')} // Register the checkbox
            />
            Required
          </label>

          <div className="flex flex-wrap items-center pt-16 pb-8 gap-x-4 gap-y-2">
            <h5 className="text-xl text-[#091540] font-semibold">
              How many people can join the activity
            </h5>
            <p className="font-medium text-slate-500">
              (You can select how many Men, Women or Total)
            </p>
          </div>


          <ActivitySelect
            className="z-30 mb-6"
            options={['USD', 'EURO', 'COP']}
            label="Currency"
            defaultValue={activityData?.pricesPlan[0]?.currency}
            setValue={handleCurrencyChange}  // Call handleCurrencyChange when currency is selected
            name="currency"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {
              commonCategories.map(category => {
                console.log('total category', activityData?.futureDates);
                return (<TextInput
                key={category}
                register={register}
                type='number'
                // defaultValue={activityData?.pricesPlan?.length && activityData?.pricesPlan.find(plan => plan.pricing_category === category)?.price}
                defaultValue={activityData?.futureDates[0]?.types.find(type => type.pricing_category === category)?.total}
                name={`total${category.charAt(0).toUpperCase() + category.slice(1)}`}
                label={`Total Attendee (${category})`}
              />)
              }
              )
            }
            {
              commonCategories.map(category => <TextInput
                key={category}
                register={register}
                type='number'
                min={minPrice(category)}
                defaultValue={activityData?.pricesPlan?.length && activityData?.pricesPlan.find(plan => plan.pricing_category === category)?.price}
                name={`${category}Price`}

                label={`Price for ${category}`}
              />)
            }
          </div>

          <div className="items-center gap-6 pt-6 sm:flex ">


            <div className='w-full mb-6 sm:mb-0'>
              <TextInput
                register={register}
                type='number'
                defaultValue={activityData?.ageFrom}
                name="ageFrom"
                label="Age from"
              />
            </div>

            <div className='w-full'>
              <TextInput
                register={register}
                type='number'
                defaultValue={activityData?.ageTo}
                name="ageTo"
                label="Age To"
              />
            </div>
          </div>

          <div className='my-6'>
            <TextArea
              register={register}
              name="attendeesBring"
              defaultValue={activityData?.attendeesBring}
              placeholder='ex: gloves, trashbags...'
              label="What Should Attendee Bring"
              className={'h-20'}
            />
          </div>

          <TextArea
            register={register}
            name="whatsIncluded"
            defaultValue={activityData?.whatsIncluded}
            placeholder='ex: Guide, Equipment, Food ...'
            label="Whats Included"
            className={'h-20'}
          />
          <div className='mt-6'>

            <TextInput
              // className="mb-6 md:flex-1"
              register={register}
              defaultValue={activityData?.minPeople}
              type='number'
              name="minPeople"
              label="Minimum number of people that can purchase the activity to make it happen "
            />
          </div>
          <div className="space-y-6">

          </div>
        </div>

        {/* next Button  */}

        <button
          type="submit"
          className="flex items-center gap-3 px-10 py-3 text-sm font-semibold text-white rounded-lg bg-primary w-max"
        >
          Next
          <span>
            <GoArrowRight className="text-[24px]" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Step4;