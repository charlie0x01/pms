import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { message, Popconfirm } from "antd";

// apis
import {
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} from "../../apis/orgApi";
import TabBarSection from "./TabBarSection";
import { delay } from "../../../utils";

const EditOrganization = ({ isOpen, setIsOpen, data }) => {
  const navigate = useNavigate();
  // udpate org
  const [
    updateOrganization,
    { isLoading, isError, isSuccess, error, data: updateResponse },
  ] = useUpdateOrganizationMutation();

  // delete org
  const [
    deleteOrganization,
    {
      isLoading: is_Loading,
      isError: is_Error,
      isSuccess: is_Success,
      error: _error,
      data: deleteResponse,
    },
  ] = useDeleteOrganizationMutation();

  const [messageApi, contextHandler] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      organizationName: data?.org_name || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      organizationName: Yup.string()
        .min(2, "Organization can contain minimum 2 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      updateOrganization({
        data: values,
        orgId: data?.org_id,
        userId: parseInt(localStorage.getItem("user_id")),
      });
    },
  });

  // delete org when delete operation confirm
  const confirmDelete = (id) => {
    deleteOrganization({ orgId: id, userId: localStorage.getItem("user_id") });
  };

  // handle update error
  useEffect(() => {
    async function handleUpdateError() {
      if (isError) {
        if (Array.isArray(error.data.error)) {
          error.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(updateResponse?.message);
        await delay(1000);
        setIsOpen(false);
        formik.resetForm();
      }
    }

    handleUpdateError();
  }, [isLoading]);
  // handle delete error
  useEffect(() => {
    async function handleDeleteErrors() {
      if (is_Error) {
        if (Array.isArray(_error.data.error)) {
          _error.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(_error.data.message);
        }
      }
      if (is_Success) {
        messageApi.success(deleteResponse?.message);
        await delay(2000);
        setIsOpen(false);
        formik.resetForm();
        navigate("/");
      }
    }

    handleDeleteErrors();
  }, [is_Loading]);
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
            {data?.org_name || "Organization Settings"}
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div class="field">
              <label class="label">Organization Name</label>
              <div class="control">
                <input
                  id="organizationName"
                  class="input"
                  type="text"
                  placeholder="Enter your organization name"
                  {...formik.getFieldProps("organizationName")}
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
            title={`Delete the ${data?.org_name}`}
            description="Are you sure to delete this organization?"
            onConfirm={() => confirmDelete(data?.org_id)}
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
        <TabBarSection orgId={data?.org_id} />
      </Modal>
    </>
  );
};

export default EditOrganization;
