// organization apis

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orgApi = createApi({
  reducerPath: "organization",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/org" }),
  endpoints: (builder) => ({
    addOrganization: builder.mutation({
      query: (data) => ({
        url: "/add-organization",
        method: "POST",
        body: data,
      }),
    }),
    getOrganizations: builder.query({
      query: (userId) => ({
        url: `/get-organizations/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export { orgApi };
export const { useAddOrganizationMutation, useGetOrganizationsQuery } = orgApi;
