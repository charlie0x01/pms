import React, { useEffect } from "react";
import { Popconfirm, message } from "antd";
import { BiPlus, BiTrash } from "react-icons/bi";
import TaskCard from "../Task/TaskCard";
import TaskForm from "../Task/TaskForm";

// apis
import {
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} from "../../apis/kanbanApi";

const KanbanColumn = ({ columnTitle, columnId, boardId }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // delete column
  const [
    deleteColumn,
    { isLoading, isError, isSuccess, error, data: deleteResponse },
  ] = useDeleteColumnMutation();

  // update column title
  const [
    updateColumnTitle,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
      error: _error,
      data: updateResponse,
    },
  ] = useUpdateColumnTitleMutation();

  // delete task
  const handleColumnDelete = (id) => {
    deleteColumn({ boardId: boardId, columnId: id });
  };

  const handleUpdateColumnTitle = (id, title) => {
    updateColumnTitle({ boardId: boardId, columnId: id, title: title });
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
      messageApi.success(deleteResponse?.message);
    }
  }, [isLoading]);

  useEffect(() => {
    if (updateError) {
      if (Array.isArray(_error.data.error)) {
        _error.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(_error.data.message);
      }
    }
    if (updateSuccess) {
      messageApi.success(updateResponse?.message);
    }
  }, [updateLoading]);

  return (
    <div>
      {contextHolder}
      <div
        className="is-flex is-flex-direction-column p-3 has-background-light "
        style={{
          maxWidth: 350,
          minWidth: 300,
          borderRadius: 8,
          height: "100vdh",
        }}
      >
        <div className="is-flex is-justify-content-space-between is-align-items-center py-3">
          <p
            style={{ display: "inline" }}
            contentEditable={true || false}
            onBlur={(e) =>
              handleUpdateColumnTitle(columnId, e.target.textContent)
            } // update the column title when changed
            onKeyDown={(e) => {
              e.key === "Enter" && e.target.blur();
            }}
            className="subtitle no-margin"
          >
            {columnTitle || "untitled"}
          </p>
          <div>
            <span className="icon icon-button cursor-hand is-clickable">
              <BiPlus />
            </span>
            <Popconfirm
              onConfirm={() => handleColumnDelete(columnId)} // first confirm then delete columns
              okText="Yes"
              cancelText="No"
              title="Are you sure to deletet this column?"
              description="All the tasks will be delete with column"
            >
              <span className="icon icon-button cursor-hand is-clickable">
                <BiTrash />
              </span>
            </Popconfirm>
          </div>
        </div>
        <div className="m-0 p-0">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          {/* {allIds.length > 0 &&
            allIds.map((id, index) => {
              if (tasks[id].columnId === columnId)
                return (
                  <TaskCard
                    key={index}
                    taskId={tasks[id].taskId}
                    title={tasks[id].taskTitle}
                    description={tasks[id].description}
                    onDelete={() => handleOnDelete(tasks[id].taskId)}
                    onEdit={() => onTaskEdit(columnId, tasks[id].taskId)}
                  />
                );
            })} */}
        </div>
      </div>
      {/* <TaskForm /> */}
    </div>
  );
};

export default KanbanColumn;
