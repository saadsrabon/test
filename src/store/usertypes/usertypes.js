import { baseApi } from '../api/baseApi';

export const UserTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetuserTypes: builder.query({
      query: () => ({
        url: `/userType`,
      }),
    }),
    // favourite: builder.query({
    //     query: (query) => ({
    //         url: `/favorite/${query}`,
    //     }),
    // }),
  }),
});

export const { useGetuserTypesQuery } = UserTypesApi;
