import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://elplanes.com/booking/success',
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Payment successful!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* PaymentElement will render card input fields */}
      <PaymentElement id="payment-element" />
      <button
        className="inline-block px-3 py-1.5 my-3 !text-sm font-medium text-white rounded-md bg-primary"
        disabled={!stripe || !elements || isLoading}
        id="submit"
      >
        {isLoading ? 'Processing...' : 'Pay now'}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;

// import { Button } from '@/components/ui/button';
// import {
//   CardElement,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from '@stripe/react-stripe-js';
// import { useState } from 'react';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: 'http://localhost:3000',
//       },
//     });
//     console.log(error);
//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === 'card_error' || error.type === 'validation_error') {
//       setMessage(error.message);
//     } else {
//       setMessage('An unexpected error occurred.');
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: 'tabs',
//   };

//   return (
//     <div className="py-20">
//       <form id="payment-form" onSubmit={handleSubmit}>
//         <PaymentElement id="payment-element" options={paymentElementOptions} />

//         <Button disabled={isLoading || !stripe || !elements} id="submit">
//           <span id="button-text">
//             {isLoading ? (
//               <div className="spinner" id="spinner"></div>
//             ) : (
//               'Pay now'
//             )}
//           </span>
//         </Button>
//         {/* Show any error or success messages */}
//         {message && <div id="payment-message">{message}</div>}
//       </form>
//       {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
//       <div id="dpm-annotation">
//         <p>
//           Payment methods are dynamically displayed based on customer location,
//           order amount, and currency.&nbsp;
//           <a
//             href={''}
//             target="_blank"
//             rel="noopener noreferrer"
//             id="dpm-integration-checker"
//           >
//             Preview payment methods by transaction
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;
