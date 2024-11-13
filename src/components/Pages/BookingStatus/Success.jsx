'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCreateTransactionMutation, usePaymentStatusMutation, useVerifyStripePaymentMutation } from '@/store/transaction/transaction';
import { CheckCircle, XCircle } from 'lucide-react'; // Import success and failure icons
import { getLocalData } from '@/lib/auth/token';

const Success = () => {
    const { toast } = useToast();
    const user = useSelector((state) => state.auth.user);

    const [isSuccess, setIsSuccess] = useState(null);
    const [loading, setIsLoading] = useState(true);

    const hasCheckedPayment = useRef(false);
    const [paymentLink, setPaymentLink] = useState(null);

    const [verifyStripePayment] = useVerifyStripePaymentMutation();
    const [paymentStatus] = usePaymentStatusMutation();
    const [createTransaction] = useCreateTransactionMutation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const paymentLinkParam = searchParams.get('payment_intent_client_secret');
            setPaymentLink(paymentLinkParam);
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

                const { data: checkingData } = await verifyStripePayment(payload);
                const { success, data } = checkingData || {};

                if (success && data) {
                    setIsSuccess(true);
                    setIsLoading(false);

                    const amount = Number(getLocalData('amount'));
                    const transactionPayload = {
                        status: 'approved',
                        amount,
                        user: user?._id,
                        email: user?.email,
                        type: "add",
                        payment_link: paymentLink,
                        adminShare: amount * 0.2,
                        hostShare: amount * 0.8,
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

                    // Update payment status
                    await paymentStatus({
                        paymentLink: paymentLink,
                        paymentStatus: 'approved',
                    });
                } else {
                    setIsLoading(false);
                    setIsSuccess(false);
                }
            } catch (err) {
                toast({
                    title: 'Something went wrong',
                });
            }
        };

        // Only run the check if it hasn't been called before and paymentLink is available
        if (paymentLink && user && !hasCheckedPayment.current) {
            hasCheckedPayment.current = true;
            checkThePayment();
        }
    }, [paymentLink, user, verifyStripePayment, paymentStatus, toast]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex items-center justify-center my-10 sm:my-20">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
                    {isSuccess ? (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Booking Successful!</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Your booking has been confirmed. Thank you for choosing our service.
                            </p>
                        </div>
                    ) : loading ? (
                        <div className="text-center">...Loading</div>
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

export default Success;
