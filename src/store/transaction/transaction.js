import { getAccessToken } from '@/lib/auth/token';
import { baseApi } from '../api/baseApi';

export const TransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/transaction/createPaymentLink',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
      // providesTags: ["Profile"],
    }),
    verifyPayment: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/transaction/verifyPayment',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
    }),
    verifyStripePayment: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/transaction/verifyStripePayment',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
    }),
    paymentStatus: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/booking/updatePaymentStatus',
          method: 'PATCH',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
    }),
    createTransaction: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/transaction/create',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
    }),
    makePaymentStripe: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/transaction/stripe/createPaymentLink',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
      // providesTags: ["Profile"],
    }),
  }),
});

export const {
  useMakePaymentMutation,
  useVerifyPaymentMutation,
  useVerifyStripePaymentMutation,
  usePaymentStatusMutation,
  useCreateTransactionMutation,
  useMakePaymentStripeMutation,
} = TransactionApi;
