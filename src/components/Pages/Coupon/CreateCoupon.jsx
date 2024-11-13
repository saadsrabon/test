'use client';
import ActivitySelect from '@/components/shared/StepInputs/ActivitySelect';
import DatePicker from '@/components/shared/StepInputs/DatePicker';
import TextInput from '@/components/shared/StepInputs/TextInput';
import { useToast } from '@/components/ui/use-toast';
import { getAccessToken } from '@/lib/auth/token';
import { useAddCouponMutation } from '@/store/coupon/coupon';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const CreateCoupon = () => {
  const [addCoupon, { isLoading, data }] = useAddCouponMutation();
  const [activityNames, setActivityNames] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const { toast } = useToast();

  // console.log(coupon)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [select, setSelect] = useState('');
  const onSubmit = async (data) => {
    const token = getAccessToken(); // Replace with your actual token
    console.log(token);
    const user = Cookies.get('name');
    const userParseData = JSON.parse(user);
    // console.log('value', {...data,select:select});
    const findActivityId = [...activityData].find(
      (item) => item?.title == select
    );
    const value = {
      ...data,
      discount: Number(data.discount),
      activity: findActivityId._id,
      by: userParseData._id,
    };
    console.log(value);
    const { data: CouponAdd, error } = await addCoupon(value);
    if (error) {
      console.log(error);
      toast({
        title: "Couldn't added coupon",
      });
      console.log(CouponAdd);
      reset();
    } else {
      toast({
        title: 'Added Coupon',
      });
      reset();
    }
  };
  useEffect(() => {
    const GetData = async () => {
      try {
        const cookieValue = Cookies.get('name');
        if (cookieValue) {
          const cookie = JSON.parse(cookieValue);
          const getActivityData = await axios.get(
            `https://api.elplanes.com/api/v1/activity/host/${cookie._id}`
          );
          setActivityData(getActivityData?.data.data);
          const data = [...getActivityData?.data.data].map(
            (item) => item?.title
          );
          setActivityNames([...data]);
          console.log([...data]);
        } else {
          console.log('Cookie not found');
        }
      } catch (err) {
        console.log(err);
      }
    };
    GetData();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-medium sm:text-xl">Create Coupon</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2"
      >
        <TextInput
          register={register}
          className={'w-full'}
          name="name"
          label="coupon name"
          placeholder="Enter the coupon name"
        />
        <ActivitySelect
          className="w-full"
          options={activityNames}
          label="Select activities for use coupon"
          defaultValue="Select"
          setValue={setSelect}
        />
        <TextInput
          register={register}
          className={'w-full'}
          type="number"
          name="discount"
          min="0"
          max="100"
          step="0.1"
          label="Type the percentage of discount"
          placeholder="Enter the discount"
        />
        <TextInput
          register={register}
          type="text"
          name="coupon"
          label="Coupon Code"
          placeholder="Enter the new coupon code name"
        />
        <DatePicker
          register={register}
          name={'expiryDate'}
          label="expiry date"
          placeholder="Enter the expiry date"
        />
        <div className="lg:col-span-2 ">
          <input
            type="submit"
            className="px-4 py-3 text-white rounded-lg cursor-pointer bg-foundation hover:bg-foundation/90"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
