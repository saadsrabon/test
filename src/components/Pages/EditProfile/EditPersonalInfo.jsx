'use client';

import EditInput from '@/components/shared/EditInput/EditInput';
import TextInput from '@/components/shared/StepInputs/TextInput';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowRight } from 'react-icons/md';

const EditPersonalInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="my-10 lg:w-[60%]">
      <div className="space-y-7">
        <h1 className="flex justify-start items-center gap-2 text-sm font-medium">
          Account
          <span>
            <MdKeyboardArrowRight className=" text-xl" />
          </span>
          Personal Info
        </h1>
        <h1 className="text-xl font-semibold">Personal Info</h1>
        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex justify-between items-center gap-5 mt-10">
            <h1 className="font-semibold text-base">Legal name</h1>
            <p className="underline text-sm">Cancel</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <TextInput
              register={register}
              name="firstName"
              label="First Name"
              placeholder="Rodgrygo Goes"
              className="text-sm"
            />
            <TextInput
              register={register}
              name="lastName"
              label="Last Name"
              placeholder="Rodgrygo Goes"
              className="text-sm"
            />
          </div>
          <EditInput
            register={register}
            name="gender"
            label="Gender"
            placeholder="Not Specified"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          <EditInput
            register={register}
            name="date"
            label="Date of birth"
            placeholder="April 17, 1997"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          <EditInput
            register={register}
            name="email"
            label="Email Address"
            placeholder="example@gmail.com"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          <EditInput
            register={register}
            name="phone"
            label="Phone Number"
            placeholder="+880 1546 52 26 35"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          <EditInput
            register={register}
            name="govtID"
            label="Government ID"
            placeholder="Provided"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          <EditInput
            register={register}
            name="address"
            label="Address"
            placeholder="Provided"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
