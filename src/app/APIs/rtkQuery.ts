import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./baseQuery";
import { exampleUrl } from "./urls";

export const exampleAPI = createApi({
  reducerPath: "example",
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: ({ query, mutation }) => ({
    exampleOne: query<any, any>({
      query: () => ({
        url: exampleUrl,
        method: "GET",
      }),
    }),
    exampleTwo: mutation<any, any>({
      query: (id: any) => ({
        url: exampleUrl,
        method: "POST",
        params: {
          id,
        },
      }),
    }),
  }),
});

export const { useExampleOneQuery, useExampleTwoMutation } = exampleAPI;
