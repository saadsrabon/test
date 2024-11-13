import { getAccessToken } from '@/lib/auth/token';
import Cookies from 'js-cookie';
import { baseApi } from '../api/baseApi';

export const ActivityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activity: builder.query({
      query: (queries) => ({
        url: `/activity/all?${queries}`,
      }),
    }),
    hostActivities: builder.query({
      query: ({ id }) => ({
        url: `/activity/host/${id}`,
      }),
    }),
    hostPastActivities: builder.query({
      query: ({ id }) => ({
        url: `/activity/pastActivities/${id}`,
      }),
    }),
    attendeesByHostId: builder.query({
      query: ({ id }) => ({
        url: `/activity/attendees/host/${id}`,
      }),
    }),
    trending: builder.query({
      query: () => ({
        url: `/activity/trending`,
      }),
    }),
    upComingHostActivity: builder.query({
      query: ({ id }) => ({
        url: `/activity/runningActivities/${id}`,
      }),
    }),
    mybooking: builder.query({
      query: () => {
        const token = getAccessToken();
        const cookies = Cookies.get('name');
        const data = JSON.parse(cookies);
        console.log(token, data);
        return {
          url: `/booking/upcomingActivities/${data?.email}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ['booking'],
    }),
    myPastbooking: builder.query({
      query: () => {
        const token = getAccessToken();
        const cookies = Cookies.get('name');
        const data = JSON.parse(cookies);
        console.log(token, data);
        return {
          url: `/booking/pastActivities/${data?.email}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ['booking'],
    }),
    rescheduleBooking: builder.mutation({
      query: (body) => {
        const token = getAccessToken();
        console.log(token); // Optional: For debugging
        return {
          url: `/booking/reschedule/${body.id}`,
          method: 'PATCH',
          headers: {
            authorization: token,
          },
          body,
        };
      },
      invalidatesTags: ['booking'],
    }),
    cancelBooking: builder.mutation({
      query: (body) => {
        const token = getAccessToken();
        console.log(token); // Optional: For debugging
        return {
          url: `/booking/cancel/${body.id}`,
          method: 'PATCH',
          headers: {
            authorization: token,
          },
          body,
        };
      },
      invalidatesTags: ['booking'],
    }),
    myAttendees: builder.query({
      query: (activityId) => {
        const token = getAccessToken();
        // const cookies = Cookies.get('name');
        // const data = JSON.parse(cookies);
        // console.log(token, data);
        return {
          url: `/booking/attendees/${activityId}`,
          headers: {
            authorization: token,
          },
        };
      },
    }),
    createActivity: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token);
        return {
          url: '/activity/create',
          method: 'POST',
          body: payload,
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ['activity'],
    }),
    bookActivity: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token); // Optional: For debugging
        return {
          url: `/booking/${payload.id}`,
          method: 'POST',
          headers: {
            authorization: token,
          },
          body: payload?.body,
        };
      },
      invalidatesTags: ['booking'],
    }),
    updateBooking: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token); // Optional: For debugging
        return {
          url: `/booking/updateBookingPaymentLink/${payload.id}`,
          method: 'PATCH',
          headers: {
            authorization: token,
          },
          body: payload?.body,
        };
      },
      invalidatesTags: ['booking'],
    }),
    rateActivity: builder.mutation({
      query: (payload) => {
        const token = getAccessToken();
        console.log(token); // Optional: For debugging
        return {
          url: `/activity/addRating/${payload.id}`,
          method: 'PATCH',
          headers: {
            authorization: token,
          },
          body: payload?.body,
        };
      },
      invalidatesTags: ['booking'],
    }),
    hostAttendence: builder.query({
      query: () => {
        const token = getAccessToken();
        const cookies = Cookies.get('name');
        const data = JSON.parse(cookies);
        // console.log(token, data);
        return {
          url: `/activity/attendees/host/${data?._id}`,
          headers: {
            authorization: token,
          },
        };
      },
      // providesTags: ['booking'],
    }),
  }),
});

export const {
  useActivityQuery,
  useTrendingQuery,
  useCreateActivityMutation,
  useMybookingQuery,
  useMyPastbookingQuery,
  useMyAttendeesQuery,
  useRescheduleBookingMutation,
  useCancelBookingMutation,
  useUpdateBookingMutation,
  useBookActivityMutation,
  useRateActivityMutation,
  useHostAttendenceQuery,
} = ActivityApi;
