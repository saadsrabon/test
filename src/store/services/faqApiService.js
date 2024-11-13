import { baseApi } from "../api/baseApi";

export const FaqApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaqs: builder.query({
            query: () => ({
                url: '/faq',
                method: 'GET'
            }),
            providesTags: ['faq'],
        }),
        createFaq: builder.mutation({
            query: ({ body, token }) => ({
                url: `/faq/create`,
                method: 'POST',
                body: body,
                headers: {
                    authorization: token,
                },
            }),
            infvalidateTags: ['faq'],
        }),
        updateFaq: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `/faq/update/${id}`,
                method: 'PATCH',
                body: body,
                headers: {
                    authorization: `${token}`,
                },
            }),
            infvalidateTags: ['faq'],
        })
    })
})

export const { useGetAllFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation } = FaqApiService;
