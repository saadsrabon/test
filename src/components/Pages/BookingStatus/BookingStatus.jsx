'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCreateTransactionMutation, usePaymentStatusMutation, useVerifyPaymentMutation } from '@/store/transaction/transaction';
import { CheckCircle, XCircle } from 'lucide-react'; // Import success and failure icons
import Link from 'next/link';
import { useSelector } from 'react-redux';

const BookingStatus = () => {
  const { toast } = useToast();
  const user = useSelector((state) => state.auth.user);

  const hasCheckedPayment = useRef(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const [status, setStatus] = useState(null);

  const [verifyPayment] = useVerifyPaymentMutation();
  const [paymentStatus] = usePaymentStatusMutation();
  const [createTransaction] = useCreateTransactionMutation();

  // UseEffect to get query parameters from the URL using window.location.search
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const boldOrderId = searchParams.get('bold-order-id');
      const boldTxStatus = searchParams.get('bold-tx-status');
      setPaymentLink(boldOrderId);
      setStatus(boldTxStatus);
    }
  }, []);

  useEffect(() => {
    const checkThePayment = async () => {
      try {
        const payload = {
          payment_link: paymentLink,
          email: user?.email,
          user_id: user?._id,
        };

        const { data: checkingData } = await verifyPayment(payload);
        const { success, data } = checkingData || {};

        if (success && data) {
          const status = data?.status;
          const transactionStatus =
            status === "PAID" ? 'approved' :
              status === "EXPIRED" ? 'failed' :
                (status === "ACTIVE" || status === "PROCESSING") ? 'pending' : null;

          if (transactionStatus) {
            const transactionPayload = {
              status: transactionStatus,
              amount: data?.total,
              user: user?._id,
              email: user?.email,
              type: "add",
              payment_link: data?.id,
              transaction_id: data?.transaction_id,
              adminShare: data?.total * 0.2,
              hostShare: data?.total * 0.8,
            };

            // Call createTransaction only once
            const { error } = await createTransaction(transactionPayload);
            if (!error) {
              toast({
                title: 'Transaction Created Successfully',
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'Something Went Wrong',
              });
            }
          }

          // Update payment status
          await paymentStatus({
            paymentLink: paymentLink,
            paymentStatus: data?.status,
          });
        }
      } catch (err) {
        toast({
          title: 'Something went wrong',
        });
      }
    };

    // Only run the check if it hasn't been called before and paymentLink exists
    if (paymentLink && user && !hasCheckedPayment.current) {
      hasCheckedPayment.current = true;
      checkThePayment();
    }
  }, [paymentLink, user, verifyPayment, paymentStatus, toast]);

  // Conditionally render different components based on the status
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center my-10 sm:my-20">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
          {status === 'approved' ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Booking Successful!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Your booking has been confirmed. Thank you for choosing our service.
              </p>
            </div>
          ) : (
            <div className="text-center">
                <XCircle className="w-16 h-16 mx-auto text-red-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Booking Failed</h2>
                <p className="mt-2 text-sm text-gray-600">
                Unfortunately, your booking was not successful. Please try again or contact support.
              </p>
            </div>
          )}
          <div className="mt-8">
            <Link href="/" passHref>
              <Button className="w-full">Return to Home Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default BookingStatus;
