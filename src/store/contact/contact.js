import { baseApi } from "../api/baseApi";

export const ContactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (credentials) => ({
                url: '/contact/sendEmail',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useSendEmailMutation } = ContactApi;