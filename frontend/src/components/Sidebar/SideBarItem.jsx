import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { Popconfirm, message } from "antd";
import { useDeleteOrganizationMutation } from "../../apis/orgApi";

const SideBarItem = ({ id, title, link, src, edit }) => {
  const [show, setShow] = useState(false);

  const [deleteOrganization, { isLoading, isError, error, data, isSuccess }] =
    useDeleteOrganizationMutation();

  const [messageApi, contextHandler] = message.useMessage();

  const handleToggleDropdown = (show) => {
    setShow(show);
  };

  const handleDelete = () => {
    const userId = localStorage.getItem("user_id");
    console.table({ id, userId });
    deleteOrganization({ orgId: id, userId: userId });
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(data?.message);
    }
  }, [isLoading]);
  return (
    <Link
      to={link}
      className="is-relative border"
      style={{ padding: 5 }}
      onMouseEnter={() => handleToggleDropdown(true)}
      onMouseLeave={() => handleToggleDropdown(false)}
    >
      {contextHandler}
      <div className="is-flex is-gap-2 is-align-items-center">
        <Avatar
          name={title}
          size="40"
          textSizeRatio={1.9}
          style={{ borderRadius: "12px" }}
          src={src}
        />
        <h1 className="subtitle is-6 m-0" style={{ fontWeight: 500 }}>
          {title}
        </h1>
        <div
          className="is-flex is-flex-direction-column is-justify-content-space-between has-background-white"
          style={{
            position: "absolute",
            height: "100%",
            right: 0,
          }}
        >
          <Popconfirm
            title="Delete the Organization"
            description="Are you sure to delete this?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            {show && (
              <div className="">
                <span className="icon is-clickable">
                  <IoTrashOutline />
                </span>
              </div>
            )}
          </Popconfirm>
          <Popconfirm
            title="Edit the Organization"
            description="Are you sure to edit this?"
            okText="Yes"
            cancelText="No"
          >
            {show && (
              <div className="">
                <span className="icon is-clickable">
                  <AiOutlineEdit />
                </span>
              </div>
            )}
          </Popconfirm>
        </div>
      </div>
    </Link>
  );
};

export default SideBarItem;
