import { baseApi } from "../api/baseApi";


export const FileUploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (files) => {
                return {
                    url: '/misc/uploadFile',
                    method: 'POST',
                    body: files,

                };
            },
        }),
    }),
});

export const { useUploadFileMutation } = FileUploadApi;
