'use client';
import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { SlPaperClip } from 'react-icons/sl';

const UploadFile = ({
  name,
  setFileValue,
  single = false,
  register,
  accept = 'image/*, video/*',
}) => {
  const [showName, setShowName] = useState([]);

  return (
    <div className="my-10 w-full max-w-[200px]">
      <label
        className=" flex max-w-[200px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-4 bg-[#F4F5F6] cursor-pointer"
        htmlFor={name}
      >
        <BsUpload />
        <div className="space-y-1.5 text-center">
          <h5 className="whitespace-nowrap text-xs font-medium tracking-tight ">
            {single ? ' Click here to upload' : 'Click here to upload more'}
          </h5>
        </div>
      </label>
      {single ? (
        <input
          {...register(`${name}`)}
          className="hidden"
          id={name}
          type="file"
          accept={accept}
        />
      ) : (
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const imageFile = e.target.files[0];
              setShowName([...showName, imageFile]);
              setFileValue && setFileValue([...showName, imageFile]);
            }
          }}
          accept={accept}
          className="hidden"
          id={name}
          type="file"
        />
      )}

      <div className=" pt-6">
        {showName?.map((perFile, idx) => (
          <div className="pt-4" key={idx}>
            <div className="flex items-center justify-between max-w-[200px] gap-2">
              <div className="">
                <SlPaperClip className="text-slate-500 text-[22px] " />
              </div>
              <div>
                <p className="flex items-center gap-px font-medium text-slate-500 w-full">
                  <span className="truncate   max-w-[150px]">
                    {perFile?.name}
                  </span>
                </p>
              </div>
              <div>
                <RxCross1 className="text-gray-500  " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
