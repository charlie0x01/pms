import React, { useEffect } from "react";
import Avatar from "react-avatar";
import moment from "moment";
import { message, Popconfirm } from "antd";
import { useParams } from "react-router-dom";

// apis
import {
  useDeleteTaskMutation,
  useGetAssigneesQuery,
} from "../../apis/taskApi";

const TaskCard = ({
  createdDate,
  dueDate,
  title,
  priority,
  taskId,
  onTaskClick,
  boardId,
  description,
}) => {
  const [messageApi, contextHandler] = message.useMessage();
  // delete api
  const [
    deleteTask,
    { isLoading, isError, isSuccess, error, data: deleteTaskReponse },
  ] = useDeleteTaskMutation();

  const { data: taskAssignees } = useGetAssigneesQuery(taskId);

  // delete task
  const handleDeleteTaskk = (id, boardId) => {
    deleteTask({ boardId: boardId, taskId: id });
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
      messageApi.success(deleteTaskReponse?.message);
    }
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <div
        onClick={() =>
          onTaskClick({
            taskId: taskId,
            dueDate: dueDate,
            priority: priority,
            description: description,
            taskTitle: title,
            boardId: boardId,
          })
        }
        draggable
        className="box p-3 is-clickable"
        style={{ maxWidth: 300 }}
      >
        <div className="is-flex is-flex-direction-column is-gap-1">
          <div className="is-flex is-justify-content-space-between">
            <div className="is-flex is-flex-wrap-wrap is-gap-1">
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
            </div>
            <Popconfirm
              onConfirm={() => handleDeleteTaskk(taskId, boardId)} // first confirm then delete columns
              okText="Yes"
              cancelText="No"
              title="Delete Task"
              description="Are you sure to delete this task?"
            >
              <button className="delete"></button>
            </Popconfirm>
          </div>
          <div>
            <h1 className="title is-size-6 mb-0 ellipsis">{title}</h1>
          </div>
          {/* <div className="is-flex is-flex-wrap-wrap is-gap-1">
          <span class="tag is-light">tags will go here</span>
        </div> */}
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <div class="avatars">
              {taskAssignees &&
                taskAssignees?.data.map((user, index) => {
                  return (
                    <Avatar
                      className="avatar"
                      name={`${user.first_name} ${user.last_name}`}
                      round
                      size="22"
                      textSizeRatio={1.9}
                    />
                  );
                })}
            </div>
            <span
              className={`is-size-7 tag is-light ${
                moment(dueDate).isSameOrBefore(moment()._d) && " is-danger"
              }`}
            >
              {moment(dueDate).format("MMM DD, yyyy")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
