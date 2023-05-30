import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Modal from "../common/Modal";
import * as Yup from "yup";
import { message } from "antd";

// apis
import { useAddMemberMutation } from "../../apis/projectApi";
import { delay } from "../../../utils";

const AddMember = ({ isOpen, setIsOpen, projectId }) => {
  const [messageApi, contextHandler] = message.useMessage();

  // add member
  const [
    addMember,
    { isLoading, isError, isSuccess, error, data: memberResponse },
  ] = useAddMemberMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      addMember({ email: values.email, projectId: projectId });
    },
  });

  useEffect(() => {
    async function handleError() {
      if (isError) {
        if (Array.isArray(error?.data.error)) {
          error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error?.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(memberResponse?.message);
        await delay(2000);
        setIsOpen(false);
        formik.resetForm();
      }
    }

    handleError();
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
            <label class="label">Member Email</label>
            <div class="control">
              <input
                id="email"
                class="input"
                type="text"
                placeholder="Enter member email"
                {...formik.getFieldProps("email")}
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="has-text-danger">{formik.errors.email}</div>
          ) : null}
          <button type="submit" className="button is-primary">
            Invite
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddMember;
