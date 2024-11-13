import { baseApi } from "../api/baseApi";

export const AuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        sendOtp: builder.mutation({
            query: (payload) => ({
                url: `/auth/sendOtp/`,
                method: 'POST',
                body: payload
            }),
        }),
        verifyOtp: builder.mutation({
            query: (payload) => ({
                url: '/auth/verifyEmail',
                method: 'POST',
                body: payload
            }),
        }),
        changePass: builder.mutation({
            query: (credentials) => ({
                url: '/auth/changePassword',
                method: 'PATCH',
                body: credentials,
            }),
        }),
    }),
})

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useSendOtpMutation, useVerifyOtpMutation, useChangePassMutation } = AuthApi;