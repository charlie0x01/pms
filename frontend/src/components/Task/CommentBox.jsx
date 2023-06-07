import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "react-avatar";
import { message } from "antd";

// aips
import { usePostCommentMutation } from "../../apis/taskApi";
import Comments from "./Comments";

const CommentBox = ({ taskId }) => {
  const [inputHeight, setInputHeight] = useState(32);
  const [messageApi, contextHandler] = message.useMessage();

  const pressedEnter = (e) => {
    if (e.which === 13) setInputHeight(inputHeight + 15);
  };

  // post comment
  const [postComment, { isLoading, isError, isSuccess, error }] =
    usePostCommentMutation();

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
      postComment({ taskId: taskId, comment: values.comment });
    },
  });

  useEffect(() => {
    if (isError) {
      messageApi.error(error?.data.message);
    }
    if (isSuccess) {
      formik.resetForm();
      setInputHeight(32);
    }
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <div className="container">
        <div className="box">
          <label className="label is-size-7 mb-2">Write a comment</label>
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
                      width: 500,
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
      </div>
      <Comments taskId={taskId} />
    </>
  );
};

export default CommentBox;
