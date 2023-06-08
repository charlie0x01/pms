import React, { useEffect, useState } from "react";

// apis
import { useGetCommentsQuery } from "../../apis/taskApi";
import Comment from "./Comment";

const Comments = ({ taskId }) => {
  const [previous, setPrevious] = useState(null);
  // get comments
  const { data: comments } = useGetCommentsQuery(taskId);

  return (
    <div className="mt-3 box">
      {comments?.data.length > 0 ? (
        <>
          <h1 className="subtitle">Comments</h1>
          {comments?.data.map((comment, index) => {
            if (comment.parent_id == null)
              return <Comment taskId={taskId} comment={comment} key={index} />;
          })}
        </>
      ) : (
        <h1 className="subtitle is-size-6">No comments yet</h1>
      )}
    </div>
  );
};

export default Comments;
