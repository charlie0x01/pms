import React, { useEffect } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
// apis
import { useAddProjectMutation } from "../../apis/projectApi";

// global state
import { useSelector } from "react-redux";

const NewProject = ({ isOpen, setIsOpen }) => {
  const organizations = useSelector((state) => state.org.organizations);
  // toast message
  const [messageApi, contextHandler] = message.useMessage();

  // add new project
  const [addProject, { isLoading, isError, isSuccess, error, data: response }] =
    useAddProjectMutation();

  const formik = useFormik({
    initialValues: {
      projectName: "",
      orgId: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
      orgId: Yup.string().required("Please select an organization"),
    }),
    onSubmit: (values) => {
      addProject({
        email: localStorage.getItem("user_email"),
        projectTitle: values.projectName,
        orgId: values.orgId,
      });
      formik.resetForm();
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(response?.message);
    }
  }, [isLoading]);
  return (
    <>
      {contextHandler}
      <Modal show={isOpen}>
        <button
          onClick={() => {
            setIsOpen(false);
            formik.resetForm();
          }}
          class="modal-close is-large"
          aria-label="close"
        ></button>
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
          {formik.touched.projectName && formik.errors.projectName ? (
            <div className="has-text-danger">{formik.errors.projectName}</div>
          ) : null}
          <div class="field">
            <label class="label">Select Menu</label>
            <div class="control">
              <div class="select is-primary">
                <select {...formik.getFieldProps("orgId")}>
                  <option>Select an option</option>

                  {organizations?.length > 0 &&
                    organizations?.map((org, index) => {
                      return (
                        <option value={org.org_id} key={index}>
                          {org.org_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          {formik.touched.orgId && formik.errors.orgId ? (
            <div className="has-text-danger">{formik.errors.orgId}</div>
          ) : null}
          <button type="submit" className="button is-primary">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};

export default NewProject;
