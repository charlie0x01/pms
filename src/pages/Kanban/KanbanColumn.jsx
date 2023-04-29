import React from "react";
import { Popconfirm, message } from "antd";
import { BiPlus, BiTrash } from "react-icons/bi";
import TaskCard from "../../components/common/TaskCard";

// selector and dispatch
import { useSelector, useDispatch } from "react-redux";
// actions
import { deleteTask } from "../../services/kanban/taskSlice";

const KanbanColumn = ({
  columnId,
  columnTitle,
  addTask,
  onTaskEdit,
  onDelete,
  onTitleChange,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  // get state and dispatch actions
  const tasks = useSelector((state) => state.task.tasks);
  const allIds = useSelector((state) => state.task.allIds);
  const dispatch = useDispatch();
  // delete task
  const handleOnDelete = (taskId) => {
    dispatch(deleteTask({ taskId: taskId }));
  };

  return (
    <div>
      {/* {contextHolder} */}
      <div
        className="is-flex is-flex-direction-column p-3 has-background-light "
        style={{ minWidth: 350, borderRadius: 8 }}
      >
        <div className="is-flex is-justify-content-space-between is-align-items-center py-3">
          <p
            contentEditable={true || false}
            onBlur={(e) => onTitleChange(columnId, e.target.textContent)} // update the column title when changed
            className="subtitle no-margin"
          >
            {columnTitle || "untitled"}
          </p>
          <div>
            <span onClick={addTask} className="icon icon-button cursor-hand">
              <BiPlus />
            </span>
            <Popconfirm
              onConfirm={onDelete} // first confirm then delete columns
              okText="Yes"
              cancelText="No"
              title="Are you sure to deletet this column?"
              description="All the tasks will be delete with column!!"
            >
              <span className="icon icon-button cursor-hand">
                <BiTrash />
              </span>
            </Popconfirm>
          </div>
        </div>
        <div>
          {allIds.length > 0 &&
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
            })}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
