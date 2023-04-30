import React from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewTeamModal = ({ isOpen, setIsOpen }) => {
  const formik = useFormik({
    initialValues: {
      teamName: "",
    },
    validationSchema: Yup.object({
      teamName: Yup.string()
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
          <label class="label">Team Name</label>
          <div class="control">
            <input
              id="teamName"
              class="input"
              type="text"
              placeholder="Enter your team name"
              {...formik.getFieldProps("teamName")}
            />
          </div>
        </div>
        {formik.touched.teamName && formik.errors.teamName ? (
          <div className="has-text-danger">{formik.errors.teamName}</div>
        ) : null}
        <button type="submit" className="button is-primary">
          Create
        </button>
      </form>
    </Modal>
  );
};

export default NewTeamModal;
