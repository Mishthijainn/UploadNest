import { apiClient } from "@/app/api-client";
import { UserAnalyticsAndChartResponse, FilterParams } from "./anayticsType";

export const analyticsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    //with chart & storage
    getUserAnalyticsWithChart: builder.query<
      UserAnalyticsAndChartResponse,
      FilterParams
    >({
      query: ({ from, to }) => ({
        url: "/analytics/user",
        method: "GET",
        params: { from, to },
      }),
      providesTags: ["analytics"],
    }),
  }),
});

export const { useGetUserAnalyticsWithChartQuery } = analyticsApi;
