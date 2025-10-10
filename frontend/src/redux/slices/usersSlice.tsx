import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

console.log("🔍 VITE_API_URL (usersSlice):", import.meta.env.VITE_API_URL)

export const usersSlice = createApi({
  reducerPath: "usersSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // <- sacamos directamente de localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("⚠️ Token no disponible en prepareHeaders");
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = usersSlice