import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { message, Popconfirm } from "antd";

// apis
import { useRemoveMemberMutation } from "../../apis/orgApi";

const MemberCard = ({ name, email, memberId, orgId, status }) => {
  const [messageApi, contextHandler] = message.useMessage();
  // remove member
  const [
    removeMember,
    { isLoading, isError, isSuccess, error, data: removeResponse },
  ] = useRemoveMemberMutation();

  const deleteUser = (member_id, org_id, user_id) => {
    removeMember({ orgId: org_id, memberId: member_id, userId: user_id });
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
  return (
    <>
      {contextHandler}
      <div className="media p-2 box" style={{ margin: 5 }}>
        <div className="media-left">
          <Avatar
            maxInitials={1}
            name={name}
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
            {status === 0 && (
              <span class="tag is-danger is-light">Response Pending</span>
            )}
            {status === 1 && (
              <span class="tag is-success is-light">
                {memberId == localStorage.getItem("user_id") && "You • "}
                Member
              </span>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
