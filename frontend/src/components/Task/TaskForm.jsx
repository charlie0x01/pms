import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import moment from "moment";

// apis
import { useAddTaskMutation } from "../../apis/taskApi";

const TaskForm = ({ isOpen, setIsOpen, columnId }) => {
  const [messageApi, contextHandler] = message.useMessage();
  // add task
  const [
    addTask,
    { isLoading, isError, isSuccess, error, data: addTaskReponse },
  ] = useAddTaskMutation();
  // formik hook
  const formik = useFormik({
    initialValues: {
      taskTitle: "",
      priority: "",
      dueDate: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      taskTitle: Yup.string()
        .min(3, "Task Title can contain minimum 3 characters")
        .max(150, "Task Title can contain maximum 150 characters")
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
      description: Yup.string().max(
        200,
        "description can only contain 200 characters"
      ),
    }),
    onSubmit: (values) => {
      addTask({
        columnId: columnId,
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
        messageApi.success(addTaskReponse?.message);
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
          class="modal-close is-large"
          aria-label="close"
        ></button>
        {/* body!!! */}
        <div className="p-3">
          <h1 className="title is-size-5 has-text-centered has-text-grey">
            Add a new task
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Task Title</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <textarea
                      style={{ minHeight: 70, maxWidth: 450 }}
                      class="input"
                      id="taskTitle"
                      type="text"
                      disabled={
                        localStorage.getItem("project_role") == 4 ||
                        localStorage.getItem("project_role") == 3
                      }
                      placeholder="Enter Task Title"
                      {...formik.getFieldProps("taskTitle")}
                    />
                  </div>
                  {formik.touched.taskTitle && formik.errors.taskTitle ? (
                    <p className="help is-danger">{formik.errors.taskTitle}</p>
                  ) : null}
                  {/* <p class="help is-danger">This field is required</p> */}
                </div>
              </div>
            </div>
            {/* {formik.touched.projectName && formik.errors.projectName ? (
            <div className="has-text-danger">{formik.errors.projectName}</div>
          ) : null} */}
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Priority</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select
                        disabled={
                          localStorage.getItem("project_role") == 4 ||
                          localStorage.getItem("project_role") == 3
                        }
                        {...formik.getFieldProps("priority")}
                      >
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

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Due Date</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <input
                      disabled={
                        localStorage.getItem("project_role") == 4 ||
                        localStorage.getItem("project_role") == 3
                      }
                      class="input"
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
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  id="description"
                  class="input"
                  rows={5}
                  disabled={
                    localStorage.getItem("project_role") == 4 ||
                    localStorage.getItem("project_role") == 3
                  }
                  style={{ minHeight: 70, maxWidth: 580 }}
                  placeholder="Enter Description"
                />
              </div>
            </div>
            <button
              disabled={
                localStorage.getItem("project_role") == 4 ||
                localStorage.getItem("project_role") == 3
              }
              type="submit"
              className="button is-primary"
            >
              Create
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TaskForm;
