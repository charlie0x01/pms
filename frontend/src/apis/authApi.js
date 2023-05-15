// apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }), // Replace with your API base URL
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/verifyemail",
        method: "POST",
        body: data,
      }),
    }),
    getNewVerificationCode: builder.mutation({
      query: (email) => ({
        url: "/new-verification-code",
        method: "POST",
        body: email,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => "/logout",
    }),
    getUser: builder.query({
      query: () => "/user",
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export { authApi };
export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetNewVerificationCodeMutation,
} = authApi;
