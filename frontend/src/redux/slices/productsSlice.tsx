import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const productsSlice = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
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
    getAllProducts: builder.query({
      query: (name) => {
        if (name) {
          return `/product/${name}`
        }
        return "/all"
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      invalidatesTags: ["Product"],
      query: (newProduct) => ({
        url: "/create",
        method: "POST",
        body: newProduct,
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/product/id/${id}`,
      providesTags: ["Product"],
    }),
    deleteProductById: builder.mutation({
      invalidatesTags: ["Product"],
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateProductById: builder.mutation({
      invalidatesTags: ["Product"],
      query: ({ id, ...values }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: values,
      }),
    }),
    getAllCategories: builder.query({
      providesTags: ["Product"],
      query: () => "/categories/all",
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
  useGetAllCategoriesQuery
} = productsSlice
