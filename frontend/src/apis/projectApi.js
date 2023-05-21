// Project apis

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectApi = createApi({
  reducerPath: "project",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/project" }),
  tagTypes: ["project"],
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: `/add-project/${data.orgId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["project"],
      invalidatesTags: ["project"],
    }),
    getProjects: builder.query({
      query: ({ orgId, userId }) => ({
        url: `/get-projects/${orgId}/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export { projectApi };
export const { useAddProjectMutation, useGetProjectsQuery } = projectApi;
