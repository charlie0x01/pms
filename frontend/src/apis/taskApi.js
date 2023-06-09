import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskApi = createApi({
  reducerPath: "task",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/task",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }), // Replace with your API base URL
  tagTypes: ["tasks", "assignees", "attachments", "comments"],
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
        body: data,
      }),
      providesTags: ["tasks"],
      invalidatesTags: ["tasks"],
    }),
    setAssignees: builder.mutation({
      query: ({ assignees, taskId }) => ({
        url: `/set-assignees/${taskId}`,
        method: "POST",
        body: { assignees: assignees },
      }),
      providesTags: ["assignees"],
      invalidatesTags: ["assignees"],
    }),
    getAssignees: builder.query({
      query: (taskId) => ({
        url: `/get-assignees/${taskId}`,
        method: "GET",
      }),
      providesTags: ["assignees"],
    }),
    changeTaskColumn: builder.mutation({
      query: ({ taskId, columnId }) => ({
        url: `/change-task-column/${taskId}/${columnId}`,
        method: "PATCH",
      }),
      providesTags: ["tasks"],
      invalidatesTags: ["tasks"],
    }),
    getAttachments: builder.query({
      query: (taskId) => ({
        url: `/get-task-attachments/${taskId}`,
        method: "GET",
      }),
      providesTags: ["attachments"],
    }),
    deleteAttachment: builder.mutation({
      query: ({ taskId, attachment }) => ({
        url: `/delete-task-attachment/${taskId}`,
        method: "DELETE",
        body: { attachment },
      }),
      providesTags: ["attachments"],
      invalidatesTags: ["attachments"],
    }),
    getActiveTasks: builder.query({
      query: () => ({
        url: `/get-active-tasks/${localStorage.getItem("user_id")}`,
        method: "GET",
      }),
      providesTags: ["tasks", "assignees"],
      invalidatesTags: ["tasks", "assignees"],
    }),
    uploadAttchment: builder.mutation({
      query: (formData) => ({
        url: "http://localhost:5000/upload/attachments",
        method: "POST",
        body: formData,
      }),
      providesTags: ["attachments"],
      invalidatesTags: ["attachments"],
    }),
    postComment: builder.mutation({
      query: ({ taskId, comment }) => ({
        url: `/post-comment/${taskId}/${localStorage.getItem("user_id")}`,
        method: "POST",
        body: { comment: comment },
      }),
      providesTags: ["comments"],
      invalidatesTags: ["comments"],
    }),
    postReply: builder.mutation({
      query: ({ taskId, comment, commentId }) => ({
        url: `/post-reply/${taskId}/${commentId}/${localStorage.getItem(
          "user_id"
        )}`,
        method: "POST",
        body: { comment: comment },
      }),
      providesTags: ["comments"],
      invalidatesTags: ["comments"],
    }),
    getComments: builder.query({
      query: (taskId) => ({
        url: `/get-comments/${taskId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
      invalidatesTags: ["comments"],
    }),
    getReplies: builder.query({
      query: ({ taskId, commentId }) => ({
        url: `/get-replies/${taskId}/${commentId}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/update-comment/${commentId}`,
        method: "PATCH",
        body: { comment: comment },
      }),
      providesTags: ["comments"],
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/delete-comment/${commentId}`,
        method: "DELETE",
      }),
      providesTags: ["comments"],
      invalidatesTags: ["comments"],
    }),
  }),
});

export { taskApi };
export const {
  useAddTaskMutation,
  useGetActiveTasksQuery,
  useUploadAttchmentMutation,
  useChangeTaskColumnMutation,
  useSetAssigneesMutation,
  useGetAssigneesQuery,
  useGetTasksQuery,
  useGetRepliesQuery,
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
  useGetAttachmentsQuery,
  useDeleteAttachmentMutation,
  usePostCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  usePostReplyMutation,
} = taskApi;
