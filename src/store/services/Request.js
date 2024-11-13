import { baseApi } from "../api/baseApi";

export const RequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcitvities: builder.query({
            query: () => ({
                url: '/activity/all',
                method: 'GET'
            }),
            providesTags: ['request', ''],
        }),
        createRequest: builder.mutation({
            query: (payload) => ({
                url: `/create-request/${payload.id}`,
                method: 'POST',
            }),
            infvalidateTags: ['request'],
        })
    })
})

export const { useGetAcitvitiesQuery, useCreateRequestMutation } = RequestApi;
