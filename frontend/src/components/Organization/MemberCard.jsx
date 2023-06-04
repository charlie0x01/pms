import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { message, Popconfirm } from "antd";
import UserRoles from "../User/UserRoles";

// apis
import {
  useRemoveMemberMutation,
  useChangeMemberRoleMutation,
} from "../../apis/orgApi";

const MemberCard = ({ name, email, memberId, orgId, status, memberRoleId }) => {
  const [promotedTo, setPromotedTo] = useState("");
  const [messageApi, contextHandler] = message.useMessage();

  if (memberId == localStorage.getItem("user_id"))
    localStorage.setItem("org_role", memberRoleId);

  // remove member
  const [
    removeMember,
    { isLoading, isError, isSuccess, error, data: removeResponse },
  ] = useRemoveMemberMutation();

  // change member role
  const [
    changeMemberRole,
    {
      isLoading: roleChangeLoading,
      isError: roleChangeError,
      isSuccess: roleChangeSuccess,
      error: _error,
      data: roleChangeResponse,
    },
  ] = useChangeMemberRoleMutation();

  const deleteUser = (member_id, org_id, user_id) => {
    removeMember({ orgId: org_id, memberId: member_id, userId: user_id });
  };

  const handleUserRoleChange = (roleId) => {
    if (roleId == 4) setPromotedTo(`${name} is Member now`);
    if (roleId == 3) setPromotedTo(`${name} is Team Lead now`);
    if (roleId == 2) setPromotedTo(`${name} is Promoted to Admin`);
    changeMemberRole({ orgId: orgId, memberId: memberId, roleId: roleId });
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error?.data.error)) {
        error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error?.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(removeResponse?.message);
    }
  }, [isLoading]);

  useEffect(() => {
    if (roleChangeError) {
      if (Array.isArray(_error?.data.error)) {
        _error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(_error?.data.message);
      }
    }
    if (roleChangeSuccess) {
      messageApi.success(promotedTo);
    }
  }, [roleChangeLoading]);
  return (
    <>
      {contextHandler}
      <div className="media p-2 box" style={{ margin: 5 }}>
        <div className="media-left">
          <Avatar
            maxInitials={1}
            // name={name}
            googleId={email}
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
            {status === 0 ? (
              <span class="tag is-danger is-light">Response Pending</span>
            ) : (
              <UserRoles
                callback={handleUserRoleChange}
                selected={memberRoleId}
                memberId={memberId}
              />
            )}

            {localStorage.getItem("org_role") == 4 ||
            localStorage.getItem("org_role") == 3 ? (
              <></>
            ) : (
              <Popconfirm
                title={`Remove ${name}`}
                description="Are you sure to remove this member?"
                onConfirm={() =>
                  deleteUser(
                    memberId,
                    orgId,
                    parseInt(localStorage.getItem("user_id"))
                  )
                }
                okText="Yes"
                cancelText="No"
              >
                <button className="delete"></button>
              </Popconfirm>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
