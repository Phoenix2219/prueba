import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const discountApiSlice = createApi({
  reducerPath: "discount",
  tagTypes: ["Discounts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/discount",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllDiscountCodes: builder.query({
      query: () => "/all",
    }),
    deleteDiscountCode: builder.mutation({
      query: (id) => ({
        url: `/discountId/${id}`,
        method: "DELETE",
      }),
    }),
    createDiscountCode: builder.mutation({
      query: (newDiscountCode) => ({
        url: "/create",
        body: newDiscountCode,
        method: "POST",
      }),
    }),
    updateDiscountCode: builder.mutation({
      query: ({ id, ...newValues }) => ({
        url: `/code/${id}`,
        method: "PUT",
        body: newValues,
      }),
    }),
  }),
})

export const {
  useGetAllDiscountCodesQuery,
  useDeleteDiscountCodeMutation,
  useCreateDiscountCodeMutation,
  useUpdateDiscountCodeMutation
} = discountApiSlice
