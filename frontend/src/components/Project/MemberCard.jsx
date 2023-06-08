import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { message, Popconfirm } from "antd";
import UserRoles from "../User/UserRoles";

// apis
import {
  useRemoveProjectMemberMutation,
  useChangeMemberRoleMutation,
} from "../../apis/projectApi";

const MemberCard = ({
  name,
  email,
  memberId,
  status,
  projectId,
  memberRoleId,
  profilePicture,
}) => {
  const isOwnerOrAdmin =
    localStorage.getItem("project_role") == 2 ||
    localStorage.getItem("project_role") == null;
  const isTeamLead = localStorage.getItem("project_role") == 3;
  const [messageApi, contextHandler] = message.useMessage();
  const [promotedTo, setPromotedTo] = useState("");

  // if (memberId == localStorage.getItem("user_id"))
  //   localStorage.setItem("project_role", memberRoleId);

  // remove project member
  const [
    removeProjectMember,
    {
      isLoading: memberLoading,
      isError: memberError,
      isSuccess: memberSuccess,
      error: _error,
      data: memberDeleteResponse,
    },
  ] = useRemoveProjectMemberMutation();

  // change role
  const [
    changeMemberRole,
    { isLoading, isError, isSuccess, error, data: roleChangeResponse },
  ] = useChangeMemberRoleMutation();

  const handleUserRoleChange = (roleId) => {
    if (roleId == 4) setPromotedTo(`${name} is Member now`);
    if (roleId == 3) setPromotedTo(`${name} is Team Lead now`);
    if (roleId == 2) setPromotedTo(`${name} is Promoted to Admin`);
    changeMemberRole({
      projectId: projectId,
      memberId: memberId,
      roleId: roleId,
    });
  };

  const deleteUser = (member_id, project_id, user_id) => {
    removeProjectMember({
      projectId: project_id,
      memberId: member_id,
      userId: user_id,
    });
  };

  useEffect(() => {
    if (memberError) {
      // if (Array.isArray(_error?.data.error)) {
      //   _error?.data.error.forEach((el) => messageApi.error(el.message));
      // } else {
      messageApi.error(_error?.data.message);
      // }
    }
    if (memberSuccess) {
      messageApi.success(memberDeleteResponse?.message);
    }
  }, [memberLoading]);

  useEffect(() => {
    if (isError) {
      // if (Array.isArray(_error?.data.error)) {
      //   _error?.data.error.forEach((el) => messageApi.error(el.message));
      // } else {
      messageApi.error(error?.data.message);
      // }
    }
    if (isSuccess) {
      messageApi.success(promotedTo);
    }
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <div className="media p-2 box" style={{ margin: 5 }}>
        <div className="media-left">
          <Avatar
            maxInitials={1}
            name={name}
            src={profilePicture}
            round
            size="30"
            textSizeRatio={1.9}
          />
        </div>
        <div className="media-content">
          <p className="title is-6">{name}</p>
          <p className="subtitle is-7">{email}</p>
        </div>
        <div className="media-right">
          <div className="is-flex is-align-items-center is-gap-2">
            {memberId != localStorage.getItem("user_id") ? (
              <>
                {status === 0 ? (
                  <span class="tag is-danger is-light">Response Pending</span>
                ) : (
                  <UserRoles
                    callback={handleUserRoleChange}
                    selected={memberRoleId}
                    isOwnerOrAdmin={isOwnerOrAdmin}
                  />
                )}
              </>
            ) : (
              <span class="tag is-success is-light">
                {memberRoleId == 4 && "Member"}
                {memberRoleId == 3 && "Team Lead"}
                {memberRoleId == 2 && "Admin"}
              </span>
            )}
            {memberId != localStorage.getItem("user_id") && (
              <>
                {(isOwnerOrAdmin || isTeamLead) && (
                  <Popconfirm
                    title={`Remove ${name}`}
                    description="Are you sure to remove this member?"
                    onConfirm={() =>
                      deleteUser(
                        memberId,
                        projectId,
                        parseInt(localStorage.getItem("user_id"))
                      )
                    }
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="delete"></button>
                  </Popconfirm>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
