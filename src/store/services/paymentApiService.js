import { baseApi } from "../api/baseApi";

export const PaymentApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (payload) => ({
                url: '/payment/initiate',
                method: 'POST',
                body: payload,
            }),
            infvalidateTags: ['payment'],
        }),
        newPaymentRequest: builder.mutation({
            query: ({ body }) => ({
                url: `payment/webhook`,
                method: 'POST',
                body: body,
                headers: {
                    authorization: token,
                },
            }),
            infvalidateTags: ['payment'],
        })
    })
})

export const { useInitiatePaymentMutation, useNewPaymentRequestMutation } = PaymentApiService;
