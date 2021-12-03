import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "app/store";

const isDevelopment = process.env.NODE_ENV === "development";

export const customBaseQuery = fetchBaseQuery({
  baseUrl: isDevelopment
    ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState() as RootState;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
