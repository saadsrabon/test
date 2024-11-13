import { baseApi } from "../api/baseApi";

export const BookingApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        updateBooking: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `/booking/updateBookingStatus/${id}`,
                method: 'PATCH',
                body: body,
                headers: {
                    authorization: `${token}`,
                },
            }),
            infvalidateTags: ['booking'],
        })
    })
})

export const { useUpdateBookingMutation } = BookingApiService;
