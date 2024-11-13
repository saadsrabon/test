import { useMakePaymentStripeMutation } from '@/store/transaction/transaction';
import Image from 'next/image';
import { useState } from 'react';
import stripe from '/src/assets/payment/stripe.png';
const ActivityPaymentStripe = ({ price }) => {
    const [clientSecret, setClientSecret] = useState("");
  const [makePaymentStripe] = useMakePaymentStripeMutation();
  const MakePaymentUsingStripe = async () => {
    const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);
    if (!stripe) {
      return;
    }
    try {
      const { data: res, error } = await makePaymentStripe({
        amount: 1200,
      });
      console.log(res);
    } catch (err) {
      toast({
        title: 'Booking Failed',
        status: 'error',
      });
    }
  };
  return (
    <div
      onClick={MakePaymentUsingStripe}
      className="w-full  border rounded-xl cursor-pointer  p-3"
    >
      <Image
        width={200}
        height={80}
        className="  object-contain max-w-[70px] mx-auto"
        src={stripe}
        alt="stripe"
      />
    </div>
  );
};

export default ActivityPaymentStripe;
