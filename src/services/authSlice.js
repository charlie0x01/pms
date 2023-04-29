
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
    logout: builder.mutation({
      query: () => '/logout',
    }),
    getUser: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
