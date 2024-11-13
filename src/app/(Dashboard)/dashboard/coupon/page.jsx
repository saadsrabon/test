import CreateCoupon from '@/components/Pages/Coupon/CreateCoupon';
import RunningCoupon from '@/components/Pages/Coupon/RunningCoupon';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';

const page = () => {
  return (
    <ProtectedPage role={['host']}>
    <div className="sm:p-10 p-6">
      <CreateCoupon />
      <RunningCoupon />
    </div>
    </ProtectedPage >
  );
};

export default page;
