import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { delay } from "../../../utils";
import TabSection from "./TabSection";

// apis
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../apis/projectApi";

const EditProject = ({ isOpen, setIsOpen, data }) => {
  const navigate = useNavigate();

  // udpate project
  const [
    updateProject,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSucess,
      error: updateError,
      data: updateResponse,
    },
  ] = useUpdateProjectMutation();

  // delete projects
  const [
    deleteProject,
    {
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
      data: deleteResponse,
    },
  ] = useDeleteProjectMutation();

  const [messageApi, contextHandler] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      projectName: data?.data.project_title || "",
      description: data?.data.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      projectName: Yup.string()
        .min(2, "project title can contain minimum 2 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      updateProject({
        projectTitle: values.projectName,
        description: values.description,
        projectId: data?.data.project_id,
      });
    },
  });

  // delete org when delete operation confirm
  const confirmDelete = (id) => {
    deleteProject(id);
  };

  // handle update error
  useEffect(() => {
    async function handleUpdateError() {
      if (isUpdateError) {
        if (Array.isArray(updateError?.data.error)) {
          updateError?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(updateError?.data.message);
        }
      }
      if (isUpdateSucess) {
        messageApi.success(updateResponse?.message);
        await delay(1000);
        setIsOpen(false);
        formik.resetForm();
      }
    }

    handleUpdateError();
  }, [isUpdateLoading]);
  // handle delete error
  useEffect(() => {
    async function handleDeleteErrors() {
      if (isDeleteError) {
        if (Array.isArray(deleteError?.data.error)) {
          deleteError?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(deleteError?.data.message);
        }
      }
      if (isDeleteSuccess) {
        messageApi.success(deleteResponse?.message);
        formik.resetForm();
        setIsOpen(false);
        navigate(-1);
      }
    }

    handleDeleteErrors();
  }, [isDeleteLoading]);
  return (
    <>
      {contextHandler}
      <Modal show={isOpen}>
        <div className="is-relative">
          <button
            onClick={() => {
              setIsOpen(false);
              formik.resetForm();
            }}
            class="modal-close is-large"
            aria-label="close"
          ></button>
          <h1 className="title is-4">
            {data?.data.project_title || "Project Settings"}
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div class="field">
              <label class="label">Project Name</label>
              <div class="control">
                <input
                  id="projectName"
                  class="input"
                  type="text"
                  placeholder="Enter your project name"
                  {...formik.getFieldProps("projectName")}
                />
              </div>
            </div>
            {formik.touched.organizationName &&
            formik.errors.organizationName ? (
              <div className="has-text-danger">
                {formik.errors.organizationName}
              </div>
            ) : null}
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  id="description"
                  class="input"
                  rows={5}
                  cols={5}
                  placeholder="Enter Description"
                  {...formik.getFieldProps("description")}
                />
              </div>
            </div>
            <button type="submit" className="button is-primary">
              Save Changes
            </button>
          </form>
          <Popconfirm
            title={`Delete the ${data?.data.project_title}`}
            description="Are you sure to delete this organization?"
            onConfirm={() => confirmDelete(data?.data.project_id)}
            okText="Yes"
            cancelText="No"
          >
            <button
              style={{ position: "absolute", left: 130, bottom: 1 }}
              className="button is-danger ml-2"
            >
              Delete
            </button>
          </Popconfirm>
        </div>
        <TabSection projectId={data?.data.project_id} />
      </Modal>
    </>
  );
};

export default EditProject;
