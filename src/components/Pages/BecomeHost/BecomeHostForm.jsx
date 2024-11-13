'use client';
import EditInput from '@/components/shared/EditInput/EditInput';
import TextArea from '@/components/shared/StepInputs/TextArea';
import SingleImageUpload from '@/components/shared/UploadFile/SingleFileUpload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetProfileQuery } from '@/store/profile/profile';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const BecomeHostForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const user = useSelector((state) => state.auth.user);
  const { data: { data: profile } = {}, isLoading: profileLoading } =
    useGetProfileQuery(user?._id);

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const sendHostBecomingRequest = async () => {
    try {
      const res = await axios.patch(
        `https://api.elplanes.com/api/v1/profile/sendHostReq/${user?._id}`,
        {
          hostBecomingReason: watch('hostBecomingReason'),
          id_type: watch('id_type'),
          id_number: watch('id_number'),
          govt_id_front: front,
          govt_id_back: back,
          paymentInfo: {
            bankName: watch('bank_name'),
            branchName: watch('branchName'),
            accountNumber: watch('accountNumber'),
            accountName: watch('accountName'),
            accountType: watch('accountType'),
            routingNumber: watch('routingNumber'),
          },
        },
        {
          headers: {
            authorization: Cookies.get('accessToken'),
          },
        }
      );

      if (res.status === 200) {
        toast({
          title: 'Your request has been sent successfully',
          description: 'wait for admin approval',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="my-10 lg:w-full">
      <h1 className="lg:md:text-2xl text-xl font-semibold">
        Become A Host{' '}
        <span className="text-primary text-sm">
          {profile?.hostRequest != 'not sent'
            ? '(please wait for approval)'
            : ''}
        </span>
      </h1>
      <form
        onSubmit={handleSubmit(sendHostBecomingRequest)}
        className="w-full my-6"
      >
        <div className="lg:md:mb-8 mb-6">
          <h2 className="lg:md:text-lg text-md font-medium mb-6 underline-offset-1">
            Why do you want to become a host?
          </h2>
          <TextArea
            register={register}
            name="hostBecomingReason"
            label="Host becoming reason"
            defaultValue={profile?.hostBecomingReason}
            placeholder="Write here"
            className={`mt-4`}
          />
        </div>

        <h2 className="lg:md:text-lg text-md font-medium mb-2">
          Bank Information
        </h2>
        <div className="grid lg:md:grid-cols-2 md:grid-cols-1 gap-4 w-full mt-4 lg:md:mb-8 mb-6">
          <EditInput
            register={register}
            name="bankName"
            label="Bank Name"
            defaultValue={profile?.paymentInfo?.bankName}
            placeholder="swiss bank"
            type="text"
          />
          <EditInput
            register={register}
            name="branchName"
            label="Branch Name"
            defaultValue={profile?.paymentInfo?.branchName}
            placeholder="toronto"
          />
          <EditInput
            register={register}
            name="accountNumber"
            label="Account Number"
            defaultValue={profile?.paymentInfo?.accountNumber}
            placeholder="553344"
            type="number"
          />
          <EditInput
            register={register}
            name="accountName"
            label="Account Holder Name"
            defaultValue={profile?.paymentInfo?.accountName}
            placeholder="john doe"
            type="text"
          />
          <EditInput
            register={register}
            name="accountType"
            label="Account Type"
            defaultValue={profile?.paymentInfo?.accountType}
            placeholder="savings"
            type="text"
          />
          <EditInput
            register={register}
            name="routingNumber"
            label="Account Routing Number"
            defaultValue={profile?.paymentInfo?.routingNumber}
            placeholder="5533442211"
            type="number"
          />
        </div>

        <h2 className="lg:md:text-lg text-md font-medium mb-2">
          Identity Information
        </h2>
        <div className="grid lg:md:grid-cols-2 md:grid-cols-1 gap-4 w-full mt-4 ">
          <EditInput
            register={register}
            name="id_type"
            label="Govt ID Type"
            defaultValue={profile?.id_type}
            placeholder="passport"
            type="text"
          />
          <EditInput
            register={register}
            name="id_number"
            label="Govt ID Number"
            defaultValue={profile?.id_number}
            placeholder="1234567890"
          />
          <SingleImageUpload
            fieldName="govt_id_front"
            imageUrl={front}
            setImageUrl={setFront}
            setValue={setValue}
            label="ID Front"
          />
          <SingleImageUpload
            fieldName="govt_id_back"
            imageUrl={back}
            setImageUrl={setBack}
            setValue={setValue}
            label="ID Back"
          />
        </div>

        <Button
          type="submit"
          className="w-full border-2 border-primary mt-4"
          variant="primary"
          disabled={profile?.hostRequest != 'not sent' ? true : false}
        >
          {profile?.hostRequest != 'not sent' ? 'Request Sent' : 'Send Request'}
        </Button>
      </form>
    </div>
  );
};

export default BecomeHostForm;
