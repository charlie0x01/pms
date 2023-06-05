import React, { useEffect, useState } from "react";
import { Popconfirm, message } from "antd";
import { BiPlus, BiTrash } from "react-icons/bi";
import TaskCard from "../Task/TaskCard";
import TaskForm from "../Task/TaskForm";

// apis
import {
  useDeleteColumnMutation,
  useUpdateColumnTitleMutation,
} from "../../apis/kanbanApi";

import {
  useGetTasksQuery,
  useChangeTaskColumnMutation,
} from "../../apis/taskApi";
import EditTask from "../Task/EditTask";

const KanbanColumn = ({ columnTitle, columnId, boardId }) => {
  const [editTaskData, setEditTaskData] = useState(null);
  const [editTask, setEditTask] = useState(false);
  // open and close state for task from
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // get tasks
  const { data: dtasks } = useGetTasksQuery(columnId);

  // change Task Column
  const [
    changeTaskColumn,
    {
      isLoading: changeColumnLoading,
      isError: changeColumnError,
      isSuccess: changeColumnSuccess,
      error: changeColumn_Error,
      data: changeColumnResponse,
    },
  ] = useChangeTaskColumnMutation();

  // update task
  const handleOnTaskClick = (task) => {
    setEditTaskData(task);
    setEditTask(true);
  };

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

  const handleOnDrop = (e) => {
    console.log(
      "from column \n",
      e.dataTransfer.getData("application/taskId"),
      columnId,
      columnTitle
    );

    changeTaskColumn({
      taskId: e.dataTransfer.getData("application/taskId"),
      columnId: columnId,
    });
  };

  const handleOnDrapOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
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

  useEffect(() => {
    if (changeColumnError) {
      if (Array.isArray(changeColumn_Error.data.error)) {
        changeColumn_Error.data.error.forEach((el) =>
          messageApi.error(el.message)
        );
      } else {
        messageApi.error(changeColumn_Error.data.message);
      }
    }
    // if (changeColumnSuccess) {
    //   messageApi.success(changeColumnResponse?.message);
    // }
  }, [changeColumnLoading]);

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
            contentEditable={
              !(
                localStorage.getItem("project_role") == 4 ||
                localStorage.getItem("project_role") == 3
              )
            }
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
          {localStorage.getItem("project_role") == 4 ||
          localStorage.getItem("project_role") == 3 ? (
            <></>
          ) : (
            <div>
              <span
                onClick={() => setIsOpen(true)}
                className="icon icon-button cursor-hand is-clickable"
              >
                <BiPlus />
              </span>
              <Popconfirm
                onConfirm={() => handleColumnDelete(columnId)} // first confirm then delete columns
                okText="Yes"
                cancelText="No"
                title="Are you sure to deletet this column?"
                description="All the tasks will delete with column"
              >
                <span className="icon icon-button cursor-hand is-clickable">
                  <BiTrash />
                </span>
              </Popconfirm>
            </div>
          )}
        </div>
        <div
          id={columnId}
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={(e) => handleOnDrapOver(e)}
          className="m-0 p-0"
          style={{ minHeight: 100 }}
        >
          {dtasks &&
            dtasks?.data.map((task, index) => {
              return (
                <TaskCard
                  key={index}
                  taskId={task.task_id}
                  createdDate={task.created_date.slice(0, 10)}
                  dueDate={task.due_date}
                  title={task.task_title}
                  priority={task.priority}
                  description={task.description}
                  boardId={boardId}
                  onTaskClick={handleOnTaskClick}
                />
              );
            })}
        </div>
      </div>
      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} columnId={columnId} />
      <EditTask isOpen={editTask} setIsOpen={setEditTask} task={editTaskData} />
    </div>
  );
};

export default KanbanColumn;
