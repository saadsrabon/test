'use client';
// import { useToast } from '@/components/ui/use-toast';
// import { useMakePaymentStripeMutation } from '@/store/transaction/transaction';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import CompletePage from './CompletePage';
// import { useUpdateBookingMutation } from '@/store/activity/activity';
// import { getLocalData } from '@/lib/auth/token';
import Cookies from 'js-cookie';

const CheckoutStripe = () => {
  const stripePromise = loadStripe('pk_test_51LHswIIH6MxdVQFcCo6bDvfwV7i2rzgIXaXzi6LjOLtFIrQMovmmTTAOsHziNIikIQAz8IP69AsbtD8C1lHMdYdt00vj7YJBXC'); 
  const [confirmed, setConfirmed] = useState(false);
  const clientSecret = Cookies.get("clientSecret");

  const appearance = {
    theme: 'stripe',
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance,
          }}
          stripe={stripePromise}
        >
          {confirmed ? (
            <CompletePage intent={clientSecret} />
          ) : (
            <CheckoutForm />
          )}
        </Elements>
      )}
    </div>
  );
};

export default CheckoutStripe;