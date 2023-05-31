import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
// apis
import { useAddProjectMutation } from "../../apis/projectApi";

// global state
import { useSelector } from "react-redux";
import { delay } from "../../../utils";

const NewProject = ({ setIsOpen }) => {
  const organizations = useSelector((state) => state.org.organizations);
  console.table(organizations);
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
        .min(3, "Must be 4 characters or more")
        .required("Required"),
      orgId: Yup.string().required("Please select an organization"),
    }),
    onSubmit: (values) => {
      addProject({
        projectTitle: values.projectName,
        orgId: values.orgId,
        userId: localStorage.getItem("user_id"),
      });
      formik.resetForm();
    },
  });

  useEffect(() => {
    async function handleError() {
      if (isError) {
        if (Array.isArray(error.data.error)) {
          error.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(response?.message);
        await delay(1000);
        setIsOpen(false);
      }
    }

    handleError();
  }, [isLoading]);
  return (
    <>
      {contextHandler}
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
    </>
  );
};

export default NewProject;
