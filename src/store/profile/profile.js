import { baseApi } from "../api/baseApi";

export const ProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (userId) => ({
                url: `/profile/${userId}`,
            }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation({
            query: ({ userId, profileData, accessToken }) => ({
                url: `/profile/${userId}`,
                method: 'PATCH',
                body: profileData,
                headers: {
                    Authorization: accessToken, // Add the Authorization header
                },
            }),
            invalidatesTags: ['Profile'],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = ProfileApi;

