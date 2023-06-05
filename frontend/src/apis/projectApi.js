// Project apis

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectApi = createApi({
  reducerPath: "project",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/project" }),
  tagTypes: ["projects"],
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: `/add-project/${data.orgId}/${data.userId}`,
        method: "POST",
        body: { projectTitle: data.projectTitle },
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    getProjects: builder.query({
      query: (orgId) => ({
        url: `/get-projects/${orgId}/${localStorage.getItem("user_id")}`,
        method: "GET",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `/get-project/${projectId}/${localStorage.getItem("user_id")}`,
        method: "GET",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `/update-project/${data.projectId}/${parseInt(
          localStorage.getItem("user_id")
        )}`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/delete-project/${projectId}/${parseInt(
          localStorage.getItem("user_id")
        )}`,
        method: "DELETE",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: `/add-member/${data.projectId}/${parseInt(
          localStorage.getItem("user_id")
        )}/${data.memberRoleId}`,
        method: "POST",
        body: { email: data.email },
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    joinProject: builder.mutation({
      query: (data) => ({
        url: `/join-project/${parseInt(localStorage.getItem("user_id"))}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    getMembers: builder.query({
      query: (projectId) => ({
        url: `/get-members/${projectId}`,
        method: "GET",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    removeProjectMember: builder.mutation({
      query: (data) => ({
        url: `/remove-member/${data.projectId}/${data.memberId}/${data.userId}`,
        method: "DELETE",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    changeProjectStatus: builder.mutation({
      query: (projectId) => ({
        url: `/change-project-status/${projectId}`,
        method: "PATCH",
      }),
      providesTags: ["projects"],
      invalidatesTags: ["projects"],
    }),
    changeMemberRole: builder.mutation({
      query: ({ projectId, memberId, roleId }) => ({
        url: `/change-member-role/${projectId}/${memberId}/${roleId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export { projectApi };
export const {
  useAddProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddMemberMutation,
  useJoinProjectMutation,
  useChangeMemberRoleMutation,
  useGetMembersQuery,
  useRemoveProjectMemberMutation,
} = projectApi;
