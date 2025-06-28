import { baseApi } from "@/redux/api/baseApi";

const summarizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.mutation({
      query: (content) => ({
        url: "/summarize",
        method: "POST",
        body: { content },
      }),
    }),
  }),
});

export const { useGetSummaryMutation } = summarizeApi;
