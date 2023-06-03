import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Replace with your API base URL
  tagTypes: ["user"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verifyemail",
        method: "POST",
        body: data,
      }),
    }),
    getNewVerificationCode: builder.mutation({
      query: (email) => ({
        url: "/auth/new-verification-code",
        method: "POST",
        body: email,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email: email },
      }),
    }),
    verifyForgetPasswordOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // logout: builder.mutation({
    //   query: () => "/logout",
    // }),
    getUser: builder.query({
      query: (id) => `/user/get-user/${id}`,
      method: "GET",
    }),
    getUserRoles: builder.query({
      query: () => "/user/get-user-roles",
      method: "GET",
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/user/update-user-profile/${id}`,
        method: "PATCH",
        body: user,
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
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
  // useGetUsersQuery,
  useGetUserRolesQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetNewVerificationCodeMutation,
  useVerifyForgetPasswordOTPMutation,
} = authApi;
