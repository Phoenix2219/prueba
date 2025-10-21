import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesSlice = createApi({
  reducerPath: "coursesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/course`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    // Crear curso
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "/new",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // Obtener todos los cursos
    getAllCourses: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // Actualizar curso (nombre, docente, estado, etc.)
    updateCourse: builder.mutation({
      query: ({ id, ...updatedCourse }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // Marcar curso como inactivo (soft delete)
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesSlice;
