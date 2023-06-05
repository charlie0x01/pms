import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// apis
import { useDeleteUserMutation } from "../../apis/authApi";

const DeleteUser = ({ isOpen, setIsOpen, captcha }) => {
  const [messageApi, contextHandler] = message.useMessage();
  const navigate = useNavigate();
  // delete user
  const [
    deleteUser,
    { isLoading, isError, isSuccess, error, data: deleteResponse },
  ] = useDeleteUserMutation();

  const formik = useFormik({
    initialValues: {
      captcha: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      captcha: Yup.string()
        .required("Please confirm your password.")
        .oneOf([captcha], "Captcha do not match."),
    }),
    onSubmit: (values) => {
      deleteUser(localStorage.getItem("user_id"));
    },
  });

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error?.data.error)) {
        error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error?.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(deleteResponse?.message);
      navigate("/signin");
      localStorage.clear();
      formik.resetForm();
    }
  }, [isLoading]);

  return (
    <Modal show={isOpen}>
      {contextHandler}
      <div className="is-relative">
        <p className="subtitle is-unselectable">{captcha}</p>
        <form onSubmit={formik.handleSubmit}>
          <div class="field">
            <label className="label">Type the above Captcha</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Enter the Captcha"
                {...formik.getFieldProps("captcha")}
              />
            </div>
            {formik.touched.captcha && formik.errors.captcha ? (
              <p className="help is-danger">{formik.errors.captcha}</p>
            ) : null}
          </div>
          <p className="subtitle is-unselectable is-size-7">
            Note: Deleting your profile will permanently remove all your data
            and cannot be undone.
            <br />
            We're sorry to see you go and appreciate your time with us.
          </p>
          <button type="submit" className="button is-danger mr-3">
            Delete
          </button>
        </form>
        <button
          onClick={() => setIsOpen(false)}
          className="button "
          style={{ position: "absolute", bottom: "0px", left: "90px" }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUser;
