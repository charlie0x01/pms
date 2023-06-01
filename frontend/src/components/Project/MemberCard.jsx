import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { message, Popconfirm } from "antd";

// apis
import { useRemoveProjectMemberMutation } from "../../apis/projectApi";

const MemberCard = ({ name, email, memberId, status, projectId, roleId }) => {
  const [messageApi, contextHandler] = message.useMessage();

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
                Member {roleId}
              </span>
            )}
            {roleId === 4 ? (
              <></>
            ) : (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
