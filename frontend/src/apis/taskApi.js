import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskApi = createApi({
  reducerPath: "task",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/task" }), // Replace with your API base URL
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: `/add-task/${localStorage.getItem("user_id")}/${data.columnId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["tasks"],
      invalidatesTags: ["tasks"],
    }),
    getTasks: builder.query({
      query: (columnId) => ({
        url: `/get-tasks/${columnId}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),
    getSingleTask: builder.query({
      query: (taskId) => ({
        url: `/get-task/${taskId}`,
        method: "GET",
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `/delete-task/${localStorage.getItem("user_id")}/${data.boardId}/${
          data.taskId
        }`,
        method: "DELETE",
      }),
      providesTags: ["tasks"],
      invalidatesTags: ["tasks"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/update-task/${localStorage.getItem("user_id")}/${data.boardId}/${
          data.taskId
        }`,
        method: "PATCH",
        body: data
      }),
      providesTags: ["tasks"],
      invalidatesTags: ["tasks"],
    }),
  }),
});

export { taskApi };
export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
