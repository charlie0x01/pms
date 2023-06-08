import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const notificationApi = createApi({
  reducerPath: "notification",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/notification",
  }), // Replace with your API base URL
  tagTypes: ["notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/get-notifications/${localStorage.getItem("user_id")}`,
        method: "GET",
      }),
      providesTags: ["notifications"],
      invalidatesTags: ["notifications"],
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/delete-notification/${notificationId}`,
        method: "DELETE",
      }),
      providesTags: ["notifications"],
      invalidatesTags: ["notifications"],
    }),
    deleteNotifications: builder.mutation({
      query: () => ({
        url: `/delete-notification/${localStorage.getItem("user_id")}`,
        method: "DELETE",
      }),
      providesTags: ["notifications"],
      invalidatesTags: ["notifications"],
    }),
  }),
});

export { notificationApi };
export const {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteNotificationsMutation,
} = notificationApi;
