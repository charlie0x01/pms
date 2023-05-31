import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddOrganizationMutation } from "../../apis/orgApi";
import { message } from "antd";

const NewOrganization = ({ setIsOpen }) => {
  const [addOrganization, { isLoading, isError, isSuccess, error, data }] =
    useAddOrganizationMutation();

  const [messageApi, contextHandler] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      organizationName: "",
    },
    validationSchema: Yup.object({
      organizationName: Yup.string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      addOrganization({
        organizationName: values.organizationName,
      });
      setIsOpen(false);
      formik.resetForm();
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
      messageApi.success(data?.message);
    }
  }, [isLoading]);
  return (
    <>
      {contextHandler}
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
        {formik.touched.organizationName && formik.errors.organizationName ? (
          <div className="has-text-danger">
            {formik.errors.organizationName}
          </div>
        ) : null}
        <button type="submit" className="button is-primary">
          Create
        </button>
      </form>
    </>
  );
};

export default NewOrganization;
