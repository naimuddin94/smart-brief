import { baseApi } from "@/redux/api/baseApi";
import { TResponse, TSummary } from "@/types";

const summarizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.mutation<
      TResponse<TSummary>,
      { content: string; type: string }
    >({
      query: (data) => ({
        url: "/summarize",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSummaryMutation } = summarizeApi;
