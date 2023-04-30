import React from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewProjectModal = ({ isOpen, setIsOpen }) => {
  const formik = useFormik({
    initialValues: {
      projectName: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
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
        <button type="submit" className="button is-primary">
          Create
        </button>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
