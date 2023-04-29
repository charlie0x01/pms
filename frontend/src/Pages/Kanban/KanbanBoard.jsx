import React, { useRef, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
const { TextArea } = Input;
import { v4 as uuid } from "uuid";
import Modal from "../../components/common/Modal";
import KanbanColumn from "./KanbanColumn";

// selector and dispatch
import { useSelector, useDispatch } from "react-redux";
// column actions
import {
  addColumn,
  deleteColumn,
  changeTitle,
} from "../../services/kanban/kanbanSlice";

// task actions
import { addTask, editTask } from "../../services/kanban/taskSlice";
import TaskForm from "../../components/common/TaskForm";

const KanbanBoard = () => {
  const taskForm = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isColumnId, setIsColumnId] = useState(null);

  //
  const columns = useSelector((state) => state.kanban.columns);
  const tasks = useSelector((state) => state.task.tasks);
  const allIds = useSelector((state) => state.kanban.allIds);
  const dispatch = useDispatch();

  //// column actions
  // add new column to kanban board
  const handleAddColumn = () => {
    dispatch(addColumn({ columnId: uuid(), columnTitle: "untitled" }));
  };
  // delete column from kanban board
  const handleOnDelete = (columnId) => {
    dispatch(deleteColumn(columnId));
  };
  // set new title when changed
  const handleOnTitleChange = (columnId, newColumnTitle) => {
    dispatch(changeTitle({ columnId: columnId, columnTitle: newColumnTitle }));
  };

  //// task actions
  const showForm = (columnId, taskId = null) => {
    setIsOpen(true);
    setIsColumnId(columnId);
    if (taskId !== null) {
      const task = tasks[taskId];
      taskForm.current.setFieldValue("taskTitke", task.taskTitle);
    }
  };

  const closeForm = () => {
    setIsOpen(false);
    setIsColumnId(null);
    taskForm.current.resetFields();
  };

  // add task on sve
  const handleAddTask = (values) => {
    dispatch(
      addTask({
        taskId: uuid(),
        taskTitle: values.taskTitle,
        description: values.description || "",
        columnId: isColumnId,
      })
    );
    taskForm.current.resetFields();
  };

  const handleEditTask = (taskId, columnId) => {
    showForm(true);
    setIsEdit(true);
    dispatch(
      editTask({
        taskId: taskId,
        taskTitle: values.taskTitle,
        description: values.description || "",
        columnId: columnId,
      })
    );
    taskForm.current.resetFields();
  };

  const onFormSubmit = (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="is-flex is-flex-direction-column gap-10">
        <div className="is-flex is-justify-content-space-between">
          <p className="title">Kanban Board</p>
          <Button onClick={handleAddColumn} type="primary">
            New Column
          </Button>
        </div>
        <div
          id="kanban-content"
          className="is-flex is-flex-direction-row is-flex-wrap-nowrap gap-10"
        >
          {allIds.length > 0 &&
            allIds.map((id, index) => {
              return (
                <KanbanColumn
                  key={index}
                  columnId={columns[id].columnId}
                  onDelete={() => handleOnDelete(columns[id].columnId)}
                  onTitleChange={handleOnTitleChange}
                  addTask={() => showForm(columns[id].columnId)}
                  onTaskEdit={showForm}
                />
              );
            })}
        </div>
      </div>
      <TaskForm
        isEdit={false}
        isOpen={isOpen}
        onClose={closeForm}
        columnId={isColumnId}
      />
    </div>
  );
};

export default KanbanBoard;
