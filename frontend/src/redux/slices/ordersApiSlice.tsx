import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const adminOrdersSlice = createApi({
  reducerPath: "adminOrders",
  tagTypes: ["AdminOrders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/orders",
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
    getAdminOrders: builder.query({
      query: () => "/all",
      providesTags: ["AdminOrders"],
    }),
    updateOrderStatus: builder.mutation({
      invalidatesTags: ["AdminOrders"],
      query: ({ orderId, status }) => ({
        url: `/${orderId}/updateStatus`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
})

export const { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } =
  adminOrdersSlice
