'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCouponByActivityIdQuery } from '@/store/coupon/coupon';
import { useState } from 'react';

const ActivityCopun = ({ data, setCouponAmount, setCouponId }) => {
  const { data: { data: coupon } = [], isLoading } = useCouponByActivityIdQuery(
    data._id
  );
  const { toast } = useToast();
  const [inputData, setInputData] = useState('');
  console.log(coupon);
  const ApplyCoupon = () => {
    // const find = coupon.find(())
    const findData = coupon?.find((item) => item.coupon == inputData);
    if (!findData) {
      console.log('Not found');
      toast({
        variant: 'destructive',
        title: "Couldn't found the coupon",
      });
    } else {
      console.log('found');
      setCouponAmount(findData.discount);
      setCouponId(findData?._id)
      toast({
        title: 'Added the coupon',
      });
    }
  };
  return (
    <div className="relative flex gap-3">
      <input
        onChange={(e) => {
          setInputData(e.target.value);
        }}
        value={inputData}
        placeholder="Coupon Code"
        className="focus:outline-none  border border-gray-300 w-full rounded-lg px-2"
      />
      <Button
        //   onClick={CompleteBooking}
        onClick={ApplyCoupon}
        className={`bg-primary text-white hover:bg-primary/90 w-[90px]`}
      >
        Apply
      </Button>
      {/* <div   className={`${inputData == '' ? 'bg-white text-gray-400':'bg-primary text-white cursor-pointer'} text-lg   absolute top-[11px] right-3  p-1 rounded-full border border-gray-400`}><MdOutlineDone /></div> */}
    </div>
  );
};

export default ActivityCopun;
