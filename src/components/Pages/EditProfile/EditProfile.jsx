'use client';
import EditInput from '@/components/shared/EditInput/EditInput';
import SingleImageUpload from '@/components/shared/UploadFile/SingleFileUpload';
import { Button } from '@/components/ui/button';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/store/profile/profile';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [profilePic, setProfilePic] = useState('');
  const [url, setUrl] = useState('');
  console.log(profilePic);
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const type = user.type;

  // console.log('user', accessToken);

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();

  // console.log(user?._id);

  const { data: { data: profile } = {}, isLoading: profileLoading } =
    useGetProfileQuery(user?._id);

  // console.log(profile);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const profileData = {
      ...data,
      profile_pic: profilePic,
      govt_id_front: { url }
    };
    console.log('datadsfdsf', profileData);

    const { data: res, error } = await updateProfile({ userId: user?._id, profileData, accessToken })

    if (error) {
      toast.error(error?.data?.message);
    } else {
      toast.success(res.message);
      router.push('/my-profile');
    }
  };

  return (
    <div className="my-10 lg:w-[60%]">
      <div className="space-y-7">
        <h1 className="flex items-center justify-start gap-2 text-sm font-medium">
          Account
          <span>
            <MdKeyboardArrowRight className="text-xl " />
          </span>
          {type === "individual" ? "Personal Info" : "Company Info"}
        </h1>
        <h1 className="text-xl font-semibold">Personal Info</h1>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <EditInput
            register={register}
            name="email"
            label="Email Address"
            className="text-muted-foreground"
            readOnly
            defaultValue={profile?.user?.email}
            // placeholder="example@gmail.com"
            labelClassName="text-gray-300"
            editClassName="text-gray-300"
          />
          {type === "individual" ? (
            <div>
              <EditInput
                register={register}
                name="first_name"
                label="First Name"
                defaultValue={profile?.user?.first_name}
              // placeholder="Rodrygo goes"
              />
              <EditInput
                register={register}
                name="last_name"
                label="Last Name"
                defaultValue={profile?.user?.last_name}
              // placeholder="Rodrygo goes"
              />
            </div>
          ) : (
            <EditInput
              register={register}
              name="first_name"
              label="Company Name"
              defaultValue={profile?.user?.first_name}
            // placeholder="Rodrygo goes"
            />
          )}
          {type === "individual" && (
            <EditInput
              register={register}
              name="gender"
              label="Gender"
              defaultValue={profile?.user?.gender}
            // placeholder="Not Specified"
            />
          )}
          <EditInput
            register={register}
            name="dob"
            type="date"
            label={`${type === "individual" ? "Date of Birth" : "Founded Date"}`}
            defaultValue={profile?.user?.dob}
          // placeholder="April 17, 1997"
          />
          
          <EditInput
            register={register}
            name="phone_number"
            label="Phone Number"
            defaultValue={profile?.phone_number}
          // placeholder="+880 1546 52 26 35"
          />
          <EditInput
            register={register}
            name="address"
            label="Address"
            defaultValue={profile?.address}
          // placeholder="Provided"
          />
          {
            type === "individual" && (
              <EditInput
                register={register}
                name="marital_status"
                label="Martial Status"
                defaultValue={profile?.marital_status}
              // placeholder="Married"
              />
            )
          }

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
