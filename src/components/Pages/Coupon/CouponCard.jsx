'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteCouponMutation } from '@/store/coupon/coupon';
import Image from 'next/image';

const CouponCard = ({ coupon }) => {
  const [deleteTheCoupon, { isLoading, data }] = useDeleteCouponMutation();
  const { toast } = useToast();
  const DeleteCoupon = async () => {
    const { data: CouponDelete, error } = await deleteTheCoupon(coupon._id);
    if (error) {
      toast({
        title: "Coupon coudn't delete",
      });
    } else {
      toast({
        title: 'Deleted Coupon',
      });
      console.log(CouponDelete);
    }
  };
  return (
    <div className="p-5 rounded-lg border max-w-[750px] flex md:flex-row flex-col gap-5">
      <Image
        src={coupon?.activity?.images[0]}
        width={200}
        height={200}
        className=" md:w-[200px] w-full"
        alt="coupon-activityprofile"
      />
      <div className=" flex flex-col gap-4">
        <h3 className="font-semibold">Give your feedback about the activity</h3>
        <div className="flex justify-between xsm:items-end gap-3 xsm:flex-row flex-col">
          <div className="flex flex-col gap-3 ">
            <h4>Coupon Code : {coupon.coupon}</h4>
            <h4>Discount : {coupon.discount}%</h4>
          </div>
          <div onClick={DeleteCoupon}>
            <Button className="bg-foundation hover:bg-foundation/90">
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
