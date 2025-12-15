import { apiClient } from "@/app/api-client";
import {
  DeleteFilesResponse,
  DownloadFilesResponse,
  GetAllFilesResponse,
  Params,
  UploadResponse,
} from "./filesType";

export const fileApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/files/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["files"],
    }),

    getAllFiles: builder.query<GetAllFilesResponse, Params>({
      query: (params) => {
        const { keyword = undefined, pageNumber = 1, pageSize = 10 } = params;
        return {
          url: "/files/all",
          method: "GET",
          params: {
            keyword,
            pageNumber,
            pageSize,
          },
        };
      },
      providesTags: ["files"],
    }),

    deleteFiles: builder.mutation<DeleteFilesResponse, string[]>({
      query: (fileIds) => ({
        url: `/files/bulk-delete`,
        method: "DELETE",
        body: { fileIds },
      }),
      invalidatesTags: ["files"],
    }),

    downloadFiles: builder.mutation<DownloadFilesResponse, string[]>({
      query: (fileIds) => ({
        url: `/files/download`,
        method: "POST",
        body: { fileIds },
      }),
    }),
  }),
});

export const {
  useUploadFilesMutation,
  useGetAllFilesQuery,
  useDeleteFilesMutation,
  useDownloadFilesMutation,
} = fileApi;
