import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const testSlice = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
  endpoints: (builder) => ({
    test: builder.query({
      query: () => "/test",
    }),
  }),
})

export const { useTestQuery } = testSlice
