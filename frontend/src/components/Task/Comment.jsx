import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { useFormik } from "formik";
import { IoMdSend } from "react-icons/io";
import * as Yup from "yup";
import { message } from "antd";

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  usePostReplyMutation,
} from "../../apis/taskApi";

const Comment = ({ comment, children, taskId, comments }) => {
  const [inputHeight, setInputHeight] = useState(32);
  const [editable, setEditable] = useState(false);
  const [messageApi, contextHandler] = message.useMessage();
  const [reply, setReply] = useState(false);

  const isOwnerOrAdmin =
    localStorage.getItem("project_role") == 2 ||
    localStorage.getItem("project_role") == null;
  const isSender = localStorage.getItem("user_id") == comment.posted_by;

  const pressedEnter = (e) => {
    if (e.which === 13) setInputHeight(inputHeight + 15);
  };
  // udpate comment
  const [
    updateComment,
    { isLoading, isError, isSuccess, error, data: updateResponse },
  ] = useUpdateCommentMutation();
  const [
    postReply,
    {
      isLoading: replyLoading,
      isError: replyError,
      isSuccess: replySuccess,
      error: reply_error,
      data: replyPostResponse,
    },
  ] = usePostReplyMutation();

  // delete comment
  const [
    deleteComment,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
      error: _error,
      data: deleteResponse,
    },
  ] = useDeleteCommentMutation();

  // handle delete
  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  const handleUpdateComment = (commentId, comment) => {
    updateComment({ commentId: commentId, comment: comment });
    setEditable(false);
  };

  const editButton = () => {
    if (isSender) {
      return (
        <>
          {!editable ? (
            <p
              onClick={() => setEditable(!editable)}
              className="is-size-7 is-clickable"
            >
              Edit{` ${comment.edited === 1 ? "(edited)" : ""}`}
            </p>
          ) : (
            <p
              onClick={() => setEditable(!editable)}
              className="is-size-7 is-clickable"
            >
              Cancel
            </p>
          )}
        </>
      );
    }

    return <></>;
  };

  const deleteButton = () => {
    if (isSender) {
      return (
        <p
          onClick={() => handleDeleteComment(comment.comment_id)}
          className="is-size-7 is-clickable"
        >
          Delete
        </p>
      );
    } else if (isOwnerOrAdmin) {
      return (
        <p
          onClick={() => handleDeleteComment(comment.comment_id)}
          className="is-size-7 is-clickable"
        >
          Delete
        </p>
      );
    } else {
      return <></>;
    }

    return <></>;
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .min(1, "comment should contain at least 1 character")
        .required("comment should contain at least 1 character"),
    }),
    onSubmit: (values) => {
      console.log(values.comment, taskId, comment.comment_id);
      postReply({
        taskId: taskId,
        commentId: comment.comment_id,
        comment: values.comment,
      });
      setReply(false);
    },
  });

  useEffect(() => {
    if (isError) {
      messageApi.error(error?.data.message);
    }
    if (isSuccess) {
      messageApi.success(updateResponse?.message);
    }
  }, [isLoading]);

  useEffect(() => {
    if (deleteError) {
      messageApi.error(_error?.data.message);
    }
    if (deleteSuccess) {
      messageApi.success(deleteResponse?.message);
    }
  }, [deleteLoading]);

  useEffect(() => {
    if (replyError) {
      messageApi.error(reply_error?.data.message);
    }
    if (replySuccess) {
      messageApi.success(replyPostResponse?.message);
    }
  }, [replyLoading]);

  return (
    <>
      {contextHandler}
      <div className="is-flex is-gap-1 is-align-items-start mb-3">
        <div>
          <Avatar
            className=""
            name={`${comment.first_name} ${comment.last_name}`}
            src={comment.profile_picture}
            round
            size="26"
            textSizeRatio={1.9}
          />
        </div>
        <div>
          <p
            onBlur={(e) =>
              handleUpdateComment(comment.comment_id, e.target.textContent)
            }
            onKeyDown={(e) => {
              e.key === "Enter" && e.target.blur();
            }}
            contentEditable={editable}
            className={`subtitle is-size-6 m-0 edit-comment ${
              !editable ? "is-unselectable" : "edit-comment"
            }`}
          >
            {comment.content}
          </p>
          <div className="is-flex is-align-items-center is-gap-1 has-text-grey">
            {editButton()}
            {deleteButton()}
            {!(localStorage.getItem("user_id") == comment.posted_by) && (
              <p
                onClick={() => setReply(!reply)}
                className="is-size-7 is-clickable"
              >
                Reply
              </p>
            )}
            <p className="is-pulled-right is-size-7">
              {comment.created_at.slice()}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-5">{children}</div>
      {reply && (
        <div className="box">
          <label className="label is-size-7 mb-2">Write a reply</label>
          <div className="is-flex is-gap-1">
            <div>
              <Avatar
                className=""
                name={`${localStorage.getItem(
                  "first_name"
                )} ${localStorage.getItem("last_name")}`}
                src={localStorage.getItem("profile_picture")}
                round
                size="26"
                textSizeRatio={1.9}
              />
            </div>
            <form className="is-flex is-gap-1" onSubmit={formik.handleSubmit}>
              <div className="field">
                <div className="">
                  <textarea
                    style={{
                      resize: "none",
                      overflow: "hidden",
                      width: "90%",
                      height: inputHeight,
                    }}
                    onKeyUp={(e) => pressedEnter(e)}
                    className="input is-small"
                    placeholder="Enter your comment"
                    {...formik.getFieldProps("comment")}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="button is-small is-primary">
                <span class="icon">
                  <IoMdSend />
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
