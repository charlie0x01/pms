
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
        query: (user) => ({
          url: '/auth/signup',
          method: 'POST',
          body: user,
        }),
      }),
    logout: builder.mutation({
      query: () => '/logout',
    }),
    getUser: builder.query({
      query: () => '/user',
    }),
  }),
});
export default authApi;
export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
