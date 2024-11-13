import CheckoutStripe from '@/components/Pages/chekout-stripe/CheckoutStripe';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <div className="max-w-2xl px-5 py-20 mx-auto bg-slate-100">
      <CheckoutStripe />
      </div>
    </ProtectedPage>
  );
};

export default page;
