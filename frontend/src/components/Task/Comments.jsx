import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "react-avatar";

// apis
import { useGetCommentsQuery } from "../../apis/taskApi";
import Comment from "./Comment";

const Comments = ({ taskId }) => {
  // get comments
  const { data: comments } = useGetCommentsQuery(taskId);

  return (
    <div className="mt-3 box">
      {comments?.data.length > 0 ? (
        <>
          <h1 className="subtitle">Comments</h1>
          {comments?.data.map((comment, index) => {
            if (comment.parent_id == null) {
              return (
                <Comment taskId={taskId} comment={comment} key={index}>
                  {comments?.data.map((reply, index) => {
                    if (reply.parent_id == comment.comment_id) {
                      return (
                        <Comment taskId={taskId} key={index} comment={reply} />
                      );
                    }
                  })}
                </Comment>
              );
            }
          })}
        </>
      ) : (
        <h1 className="subtitle is-size-6">No comments yet</h1>
      )}
    </div>
  );
};

export default Comments;
