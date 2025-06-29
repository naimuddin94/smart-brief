import { baseApi } from "@/redux/api/baseApi";
import { THistory, TResponse, TSummary } from "@/types";

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
    getHistory: builder.query<TResponse<THistory[]>, any, any>({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/history",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["history"],
    }),
  }),
});

export const { useGetSummaryMutation, useGetHistoryQuery } = summarizeApi;
