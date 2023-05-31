// organization apis

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orgApi = createApi({
  reducerPath: "organization",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/org" }),
  tagTypes: ["org", "members"],
  endpoints: (builder) => ({
    addOrganization: builder.mutation({
      query: (data) => ({
        url: `/add-organization/${localStorage.getItem("user_id")}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["org", "members"],
      invalidatesTags: ["org", "members"],
    }),
    getOrganizations: builder.query({
      query: (userId) => ({
        url: `/get-organizations/${userId}`,
        method: "GET",
      }),
      providesTags: ["org"],
    }),
    getOrganization: builder.query({
      query: (orgId) => ({
        url: `/get-organization/${orgId}`,
        method: "GET",
      }),
      providesTags: ["org"],
    }),
    deleteOrganization: builder.mutation({
      query: ({ orgId, userId }) => ({
        url: `/delete-organization/${orgId}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["org"],
      invalidatesTags: ["org"],
    }),
    updateOrganization: builder.mutation({
      query: ({ orgId, data, userId }) => ({
        url: `/update-organization/${orgId}/${userId}`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["org", "members"],
      invalidatesTags: ["org", "members"],
    }),
    addMember: builder.mutation({
      query: ({ orgId, data, userId }) => ({
        url: `/add-member/${orgId}/${userId}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["members", "org"],
      invalidatesTags: ["members", "org"],
    }),
    getMembers: builder.query({
      query: (orgId) => ({
        url: `/get-members/${orgId}`,
        method: "GET",
      }),
      providesTags: ["members"],
    }),
    removeMember: builder.mutation({
      query: ({ orgId, memberId, userId }) => ({
        url: `/remove-member/${orgId}/${memberId}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["members", "org"],
      invalidatesTags: ["members", "org"],
    }),
    joinOrganization: builder.mutation({
      query: ({ joiningCode, memberId }) => ({
        url: `/join-organization/${memberId}`,
        method: "PATCH",
        body: { joiningCode: joiningCode },
      }),
      providesTags: ["members", "org"],
      invalidatesTags: ["members", "org"],
    }),
  }),
});

export { orgApi };
export const {
  useAddOrganizationMutation,
  useGetOrganizationsQuery,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useGetOrganizationQuery,
  useGetMembersQuery,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useJoinOrganizationMutation,
} = orgApi;
