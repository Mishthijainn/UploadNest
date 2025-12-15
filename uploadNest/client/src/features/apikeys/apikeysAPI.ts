import { apiClient } from "@/app/api-client";
import {
  CreateApiKeyResponse,
  GetAllApiKeysResponse,
  Params,
} from "./apikeysType";

export const fileApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    createApiKey: builder.mutation<CreateApiKeyResponse, string>({
      query: (name) => ({
        url: "/apikey/create",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["apikey"],
    }),

    getAllApikeys: builder.query<GetAllApiKeysResponse, Params>({
      query: (params) => {
        const { pageNumber = 1, pageSize = 10 } = params;
        return {
          url: "/apikey/all",
          method: "GET",
          params: {
            pageNumber,
            pageSize,
          },
        };
      },
      providesTags: ["apikey"],
    }),

    deleteApiKey: builder.mutation<void, string>({
      query: (apiKeyId) => ({
        url: `/apikey/${apiKeyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["apikey"],
    }),
  }),
});

export const {
  useCreateApiKeyMutation,
  useGetAllApikeysQuery,
  useDeleteApiKeyMutation,
} = fileApi;
