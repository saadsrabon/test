'use client';

import TextArea from '@/components/shared/StepInputs/TextArea';
import TextInput from '@/components/shared/StepInputs/TextInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoArrowRight } from 'react-icons/go';
import HandleImageUpload from './HandleImageUpload';
import HandleVideoUpload from './HandleVideoUpload';
import PostNewActivityTItle from './PostNewActivityTItle';

const Step1 = ({ setStep, num, idx, activityData, setActivityData }) => {
  // const [fileValue, setFileValue] = useState();
  // const [fileValue1, setFileValue1] = useState(0);
  const [images, setImages] = useState(activityData?.images);
  const [videos, setVideos] = useState(activityData?.videos);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // submit function --------

  const onSubmit = (data) => {
    if (images.length + videos.length !== 5) {
      return;
    }

    const value = {
      ...data,
      images,
      videos,
    };

    setActivityData((prev) => ({ ...prev, ...value }));
    console.log('value', value);
    setStep(1);
  };


  return (
    <div key={idx} className="flex flex-col w-full gap-8 p-6 sm:p-10">
      <PostNewActivityTItle num={num} setStep={setStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* activity title ------- */}
        <TextInput
          register={register}
          defaultValue={activityData?.title}
          name="title"
          label="Activity Title"
          maxlength="75"
          placeholder="Example: Yoga for good vibe singles 35 to 45 yrs."
        ></TextInput>

        {/* activity about ------- */}

        <TextArea
          register={register}
          defaultValue={activityData?.about}
          name="about"
          className={'h-[150px]'}
          label="Describe what is  your activity about"
          placeholder="Example: This is an activity for beginners and intermediates to do some cool yoga with music that will take them to other level. At the end we will enjoy some green tea and gluten free chocolate cake. "
        ></TextArea>

        {/* activity strategy ------- */}
        <TextArea
          register={register}
          defaultValue={activityData?.strategy}
          name="strategy"
          className={'h-[150px]'}
          label="Describe your strategy to make every attendee get to know each others"
          placeholder="Example: We recommend you photos and videos to: Be in the place where the activity is going to take place (Mandatory). Show the face of the host and include other people doing the activity. (Can we leave a link to show examples)."
        ></TextArea>

        {/* Image and video uploads  */}

        {/* <div className="flex flex-col gap-4">
          <h4 className="text-lg font-medium ">
            Upload activity images and video
          </h4>
          <h6 className="text-[13px] font-medium">
            Upload images
            <span className="ml-1 font-normal text-gray-600">
              (It is recommended that the photos include people and have good
              quality. Minimum 3 photos)
            </span>
          </h6>
          <h5 className="text-sm font-semibold text-primary">
            <span className="mr-1 font-semibold">Note:</span>
            {`If you want to
            upload more then one images or videos please click again on "Click here to upload more"`}
          </h5>
          <UploadFile
            accept="image/*"
            setFileValue={setFileValue}
            name="activity-images"
          />
          <div className="flex items-center justify-between max-w-[200px] font-medium">
            <p>Upload Videos</p>
            <span className="text-gray-400">
              {fileValue1?.length ? fileValue1?.length : '0/5'})
            </span>
          </div>
          <UploadFile
            accept="video/*"
            setFileValue={setFileValue1}
            name="activity-videos"
          />
        </div> */}
        {/* <div className="mb-4">
          <label className="mb-3">Product Images</label>
          <div
            className={cn(
              'relative flex justify-between mt-2 border border-dashed rounded-md h-[248px] sm:h-auto md:pl-5 lg:pl-3 xl:pl-10 2xl:pl-20 py-5',
            )}
          >
            <label
              className={cn(
                'sm:flex sm:pl-36 md:pl-0 items-center lg:justify-between border-gray-300',
              )}
            >
              <div
                htmlFor="imageUpload"
                className={`flex justify-center flex-col items-center text-center cursor-pointer gap-3 ${images.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <ImFilePicture className="text-3xl text-muted-foreground" />
                <div className="text-gray-400">
                  <p className="mb-3">Drop images or</p>
                  <p className="text-blue-500 underline">click to browse</p>
                </div>
              </div>
              <Input
                id="imageUpload"
                name="image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={images.length >= 5}
              />
            </label>
            <div
              className={cn(
                'w-full sm:w-auto px-1 sm:px-0 '
              )}
            >
              {images.length > 0 ? (
                <div className="flex w-full">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-full`}
                    >
                      <Image
                        width={800}
                        height={300}
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        className={cn(
                          'object-cover border w-full rounded-md h-28'
                        )}
                      />
                      <button type='button'
                        onClick={() => handleImageDelete(index)}
                        className="absolute top-0 right-0 p-0.5 text-xs text-white transition-opacity duration-200 bg-red-500 rounded-md opacity-0 group-hover:opacity-80"
                      >
                        <IoCloseSharp className="text-xl" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pt-5 text-center text-gray-400 sm:hidden lg:block sm:pt-0 lg:text-sm xl:text-base">
                  <p>Add at least 4 images</p>
                  <p>Pay attention to the quality</p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            You need at least 4 images. Pay attention to the quality of the
            pictures you add (important).
          </p>
        </div> */}
        <div className="flex flex-col w-full gap-5 xl:flex-row">
          <HandleImageUpload
            videos={videos}
            images={images.length ? images : activityData?.images}
            setImages={setImages}
          />
          <HandleVideoUpload
            images={images}
            videos={videos.length ? videos : activityData?.videos}
            setVideos={setVideos}
          />
        </div>
        {/* <div className="mb-4 lg:w-1/2">
          <label className="block mb-3">Product Images</label>
          <div className="relative flex flex-col px-3 py-5 border border-dashed rounded-md">
            <label htmlFor="imageUpload" className="flex items-center justify-center gap-3 cursor-pointer">
              <ImFilePicture className="text-3xl text-muted-foreground" />
              <div className="text-gray-400">
                <p className="mb-3">Drop images or</p>
                <p className="text-blue-500 underline">click to browse</p>
              </div>
            </label>
            <input
              id="imageUpload"
              name="image"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex justify-between gap-4 mt-4">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    width={150}
                    height={150}
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="object-cover border rounded-md size-16 md:size-32"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full md:p-1 md:top-1 md:right-1 size-4 sm:size-auto"
                  >
                    <IoCloseSharp className="size-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No images selected yet.</p>
            )}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            You need at least 4 images. Pay attention to the quality of the pictures you add (important).
          </p>
        </div> */}

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

export default Step1;
