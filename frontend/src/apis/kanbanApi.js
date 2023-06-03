

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const kanbanApi = createApi({
  reducerPath: "kanban",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/kanban" }), // Replace with your API base URL
  tagTypes: ["columns"],
  endpoints: (builder) => ({
    addColumn: builder.mutation({
      query: (boardId) => ({
        url: `/add-column/${localStorage.getItem("user_id")}/${boardId}`,
        method: "POST",
      }),
      providesTags: ["columns"],
      invalidatesTags: ["columns"],
    }),
    getColumns: builder.query({
      query: (boardId) => ({
        url: `/get-columns/${boardId}`,
        method: "GET",
      }),
      providesTags: ["columns"],
      invalidatesTags: ["columns"],
    }),
    deleteColumn: builder.mutation({
      query: (data) => ({
        url: `/delete-column/${localStorage.getItem("user_id")}/${
          data.boardId
        }/${data.columnId}`,
        method: "DELETE",
      }),
      providesTags: ["columns"],
      invalidatesTags: ["columns"],
    }),
    updateColumnTitle: builder.mutation({
      query: (data) => ({
        url: `/update-column/${localStorage.getItem("user_id")}/${
          data.boardId
        }/${data.columnId}`,
        method: "PATCH",
        body: { columnTitle: data.title },
      }),
      providesTags: ["columns"],
      invalidatesTags: ["columns"],
    }),
  }),
});

export { kanbanApi };
export const {
  useAddColumnMutation,
  useGetColumnsQuery,
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} = kanbanApi;
