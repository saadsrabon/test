import { baseApi } from "../api/baseApi";

export const FavoriteApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: ({ id }) => ({
                url: `/favorite/${id}`,
                method: 'GET'
            }),
            providesTags: ['favorite'],
        }),
        createFavorite: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `/favorite/addToFavorite/${id}`,
                method: 'POST',
                body: body,
                headers: {
                    authorization: token,
                },
            }),
            infvalidateTags: ['favorite'],
        }),
        deleteFavorite: builder.mutation({
            query: ({ id, body }) => ({
                url: `/favorite/remove/${id}`,
                method: 'DELETE',
                body: body
            }),
            infvalidateTags: ['favorite'],
        })
    })
})

export const { useGetFavoritesQuery, useCreateFavoriteMutation, useDeleteFavoriteMutation } = FavoriteApiService;
