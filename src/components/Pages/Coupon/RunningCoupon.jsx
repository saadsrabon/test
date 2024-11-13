'use client';
import { useCouponbyHostIdQuery } from '@/store/coupon/coupon';
import CouponCard from './CouponCard';

const RunningCoupon = () => {
  const { data: { data: coupon } = [], isLoading } = useCouponbyHostIdQuery();

  return (
    <div className="mt-16">
      <h2 className="sm:text-xl text-lg   font-medium">Running Coupon</h2>
      <div className="flex flex-col gap-6 mt-10">
        {coupon?.map((coupon, key) => (
          <CouponCard key={key} coupon={coupon} />
        ))}
      </div>
    </div>
  );
};

export default RunningCoupon;
