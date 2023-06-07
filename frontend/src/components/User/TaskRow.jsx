import React from "react";
import moment from "moment";
import Avatar from "react-avatar";

// apis
import { useGetAssigneesQuery } from "../../apis/taskApi";

const TaskRow = ({ taskId, title, priority, dueDate }) => {
  const { data: taskAssignees } = useGetAssigneesQuery(taskId);
  return (
    <tr>
      <td>{title}</td>
      <td>
        <span
          className={`is-size-7 tag is-light ${
            moment(dueDate).isSameOrBefore(moment()._d) && " is-danger"
          }`}
        >
          {moment(dueDate).format("MMM DD, yyyy")}
        </span>
      </td>
      <td>
        {priority === "Critical" && (
          <span class="tag is-danger is-light">{priority}</span>
        )}
        {priority === "High" && (
          <span class="tag is-warning is-light">{priority}</span>
        )}
        {priority === "Neutral" && (
          <span class="tag is-primary is-light">{priority}</span>
        )}
        {priority === "Low" && (
          <span class="tag is-info is-light">{priority}</span>
        )}
      </td>
      <td>
        <div class="avatars">
          {taskAssignees &&
            taskAssignees?.data.map((user, index) => {
              return (
                <Avatar
                  key={index}
                  className="avatar"
                  name={`${user.first_name} ${user.last_name}`}
                  src={user.profile_picture}
                  round
                  size="26"
                  textSizeRatio={1.9}
                />
              );
            })}
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
