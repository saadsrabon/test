import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.elplanes.com/api/v1',
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: [
    'request',
    'coupon',
    'Profile',
    'booking',
    'faq',
    'favorite',
    'payment',
  ],
  endpoints: () => ({}),
});

// randomg