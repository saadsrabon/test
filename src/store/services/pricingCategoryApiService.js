import { baseApi } from "../api/baseApi";

export const PricingCategoryApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPricing: builder.query({
            query: () => ({
                url: '/pricingCategory',
                method: 'GET'
            }),
            providesTags: ['Pricing'],
        }),

    })
})

export const { useGetPricingQuery } = PricingCategoryApiService;
