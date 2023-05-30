import React from "react";
import { Popconfirm, message } from "antd";
import { BiPlus, BiTrash } from "react-icons/bi";
import TaskCard from "../Task/TaskCard";
import TaskForm from "../Task/TaskForm";

const KanbanColumn = ({ columnTitle }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // delete task
  const handleOnDelete = (taskId) => {};

  return (
    <div>
      {/* {contextHolder} */}
      <div
        className="is-flex is-flex-direction-column p-3 has-background-light "
        style={{ maxWidth: 350, borderRadius: 8 }}
      >
        <div className="is-flex is-justify-content-space-between is-align-items-center py-3">
          <p
            style={{ display: "inline" }}
            contentEditable={true || false}
            // onBlur={(e) => onTitleChange(columnId, e.target.textContent)} // update the column title when changed
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
              //   onConfirm={onDelete} // first confirm then delete columns
              okText="Yes"
              cancelText="No"
              title="Are you sure to deletet this column?"
              description="All the tasks will be delete with column!!"
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
      <TaskForm />
    </div>
  );
};

export default KanbanColumn;
