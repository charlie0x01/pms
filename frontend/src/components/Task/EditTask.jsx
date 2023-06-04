import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import moment from "moment";

// apis
import { useUpdateTaskMutation } from "../../apis/taskApi";
import TaskMembers from "./TaskMembers";

const EditTask = ({ isOpen, setIsOpen, task }) => {
  const [messageApi, contextHandler] = message.useMessage();

  // update task
  const [
    updateTask,
    { isLoading, isError, isSuccess, error, data: updateTaskResponse },
  ] = useUpdateTaskMutation();

  // formik hook
  const formik = useFormik({
    initialValues: {
      taskTitle: task?.taskTitle || "",
      priority: task?.priority || "",
      dueDate: task?.dueDate.slice(0, 10) || "",
      description: task?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      taskTitle: Yup.string()
        .min(3, "Task Title can contain minimum 3 characters")
        .max(60, "Task Title can contain maximum 60 characters")
        .required("Required"),
      priority: Yup.string()
        .required("Please select priority level of the task")
        .notOneOf(
          ["--Select Priority--"],
          "Please select priority level of the task"
        ),
      dueDate: Yup.string()
        .required("Select Due Date for the task")
        .test(
          "test_endDate",
          "Due Date can only be today or future date",
          (dueDate) => {
            const due = moment(dueDate)._d;
            const yesterday = moment().subtract(1, "day")._d;
            console.log("yup test ", yesterday, due);
            if (due > yesterday) return true;
            else false;
          }
        ),
    }),
    onSubmit: (values) => {
      updateTask({
        boardId: task?.boardId,
        taskId: task?.taskId,
        ...values,
      });
    },
  });

  // handle delete error
  useEffect(() => {
    async function handleAddTaskErrors() {
      if (isError) {
        if (Array.isArray(error?.data.error)) {
          error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error?.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(updateTaskResponse?.message);
        formik.resetForm();
        setIsOpen(false);
      }
    }

    handleAddTaskErrors();
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <Modal show={isOpen}>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="modal-close is-large"
          aria-label="close"
        ></button>
        {/* body!!! */}
        <div className="p-3">
          <h1 className="title is-size-5 has-text-centered has-text-grey">
            Edit Task
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Task Title</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      id="taskTitle"
                      type="text"
                      placeholder="Enter Task Title"
                      {...formik.getFieldProps("taskTitle")}
                    />
                  </div>
                  {formik.touched.taskTitle && formik.errors.taskTitle ? (
                    <p className="help is-danger">{formik.errors.taskTitle}</p>
                  ) : null}
                  {/* <p className="help is-danger">This field is required</p> */}
                </div>
              </div>
            </div>
            {/* {formik.touched.projectName && formik.errors.projectName ? (
            <div className="has-text-danger">{formik.errors.projectName}</div>
          ) : null} */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Priority</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select {...formik.getFieldProps("priority")}>
                        <option>--Select Priority--</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  {formik.touched.priority && formik.errors.priority ? (
                    <p className="help is-danger">{formik.errors.priority}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Due Date</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      placeholder="Enter Task Title"
                      {...formik.getFieldProps("dueDate")}
                    />
                  </div>
                  {formik.touched.dueDate && formik.errors.dueDate ? (
                    <p className="help is-danger">{formik.errors.dueDate}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  id="description"
                  className="input"
                  rows={5}
                  cols={5}
                  placeholder="Enter Description"
                />
              </div>
            </div>
            <button type="submit" className="button is-primary">
              Save Changes
            </button>
          </form>
        </div>
        <TaskMembers taskId={task?.taskId} />
      </Modal>
    </>
  );
};

export default EditTask;
