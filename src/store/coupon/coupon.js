import { getAccessToken } from '@/lib/auth/token';
import Cookies from 'js-cookie';
import { baseApi } from '../api/baseApi';

export const CouponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    coupon: builder.query({
      query: () => ({
        url: `/coupon`,
      }),
      providesTags: ['coupon'],
    }),
    addCoupon: builder.mutation({
      query: (credentials) => {
        const token = getAccessToken(); // Replace with your actual token
        console.log(token);
        return {
          url: '/coupon/createCoupon',
          method: 'POST',
          body: credentials,
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ['coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => {
        const token = getAccessToken();
        return {
          url: `/coupon/delete/${id}`,
          method: 'DELETE',
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ['coupon'],
    }),
    couponbyHostId: builder.query({
      query: (id) => {
        const token = getAccessToken(); // Replace with your actual token
        const cookieValue = Cookies.get('name');
        const cookie = JSON.parse(cookieValue);
        return {
          url: `/coupon/host/${cookie._id}`,
          method: 'GET',
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ['coupon'],
    }),
    couponByActivityId: builder.query({
      query: (id) => {
        return {
          url: `/coupon/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCouponQuery,
  useAddCouponMutation,
  useDeleteCouponMutation,
  useCouponbyHostIdQuery,
  useCouponByActivityIdQuery,
} = CouponApi;
