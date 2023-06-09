import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const notificationApi = createApi({
  reducerPath: "notification",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/notification",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
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
        url: `/delete-notifications/${localStorage.getItem("user_id")}`,
        method: "DELETE",
      }),
      providesTags: ["notifications"],
      invalidatesTags: ["notifications"],
    }),
    broadcast: builder.mutation({
      query: ({ message, members }) => ({
        url: `/broadcast/${localStorage.getItem("user_id")}`,
        method: "POST",
        body: { message, members },
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
  useBroadcastMutation,
} = notificationApi;
