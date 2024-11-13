'use client';
import UploadFile from '@/components/shared/UploadFile/UploadFile';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAlertCircleOutline } from 'react-icons/io5';

const ProvideInformation = () => {
  const [fileValue, setFileValue] = useState();
  const [fileValue1, setFileValue1] = useState();
  const [fileValue2, setFileValue2] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const value = {
      ...data,
      activityImages: fileValue,
      activityVideos: fileValue1,
      activityVideos: fileValue2,
    };
    console.log('value', value);
    setStep(1);
  };
  return (
    <div className="space-y-6">
      <p className="text-sm">
        You need to provide some information for post your activities{' '}
      </p>
      <h1 className="font-semibold text-xl">Provide your information</h1>
      <p className="text-sm font-semibold">Select Id type</p>
      <select className="border border-gray-300 bg-white h-10 w-full px-2 text-secondary  rounded-lg text-sm focus:outline-none">
        <option value="" disabled selected>
          Select
        </option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <Input className="border border-gray-300 " placeholder="Type ID number" />
      <div className="group col-span-2 rounded-lg">
        <textarea
          name="desc"
          placeholder="Why you want to become a host?"
          id=""
          cols="20"
          rows="5"
          className=" w-full rounded-lg border border-gray-300 px-4 py-3 text-secondary  text-sm duration-300 focus:outline-none "
        ></textarea>
      </div>
      {/* upload file */}
      <div className="space-y-5">
        <h1 className=" font-semibold"> Upload government ID</h1>
        <h5 className="text-[13px] text-foundation">
          <span className="text-sm font-semibold mr-1">Note:</span>
          {`If you want to
            upload more then one images or videos please click again on "Click to upload"`}
        </h5>
        <div className="flex justify-start items-center gap-5">
          <UploadFile setFileValue={setFileValue} name="activity-images" />
          <UploadFile setFileValue1={setFileValue1} name="activity-images" />
        </div>
      </div>
      <div className="space-y-5">
        <h1 className=" font-semibold"> Upload a photo of yours</h1>
        <p className="text-xs md:text-sm flex justify-start items-start md:items-center gap-2">
          <IoAlertCircleOutline /> Make sure that your face should be clear and
          well lighted
        </p>
        <h5 className="text-sm font-semibold text-primary">
          <span className="font-semibold mr-1">Note:</span>
          {`If you want to
            upload more then one images or videos please click again on "Click here to upload more"`}
        </h5>
        <div className="flex justify-start items-start">
          <UploadFile setFileValue={setFileValue2} name="activity-images" />
        </div>
      </div>
      <button className="bg-tertiary py-3 px-10 text-white rounded-lg font-semibold text-sm">
        Submit
      </button>
    </div>
  );
};

export default ProvideInformation;
