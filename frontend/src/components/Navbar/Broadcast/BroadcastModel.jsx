import React, { useEffect } from "react";
import Modal from "../../common/Modal";
import BroadcastTabSection from "./BroadcastTabSection";
import { IoMdSend } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";

// apis
import { useBroadcastMutation } from "../../../apis/notificationsApi";
const BroadcastModel = ({ isOpen, setIsOpen }) => {
  const [messageApi, contextHandler] = message.useMessage();
  // broadcast
  const [
    broadcast,
    { isLoading, isError, isSuccess, error, data: broadcastReponse },
  ] = useBroadcastMutation();

  const formik = useFormik({
    initialValues: {
      message: "",
      members: [],
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .min(2, "Notification message should contain at least 2 characters")
        .max(500, "Notification message can contain max 500 characters")
        .required("Required"),
      members: Yup.array()
        .min(1, "At least select 1 member")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      broadcast({ message: values.message, members: values.members });
      formik.resetForm();
    },
  });

  const handleSelectedMembers = (members) => {
    formik.setFieldValue("members", members);
  };

  useEffect(() => {
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(error.data.message);
      }
    }
    if (isSuccess) {
      messageApi.success(broadcastReponse?.message);
    }
  }, [isLoading]);

  return (
    <div>
      {contextHandler}
      <Modal show={isOpen}>
        <div className="is-relative">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            class="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
        <h1 className="subtitle">Broadcast Message</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label">Your Message</label>
            <div className="control">
              <textarea
                id="description"
                className="input"
                rows={5}
                style={{ minHeight: 100, maxWidth: 580 }}
                placeholder="Enter Your Broadcast Message"
                {...formik.getFieldProps("message")}
              />
            </div>
            {formik.touched.message && formik.errors.message ? (
              <p className="help is-danger">{formik.errors.message}</p>
            ) : null}
          </div>
          <button type="submit" className="button is-primary">
            <span>Send</span>
            <span class="icon">
              <IoMdSend />
            </span>
          </button>
        </form>
        <p className="mt-3" style={{ fontWeight: 500, fontSize: 15 }}>
          Selected Members: {formik.values.members.length}
        </p>
        {formik.touched.members && formik.errors.members ? (
          <p className="help is-danger">{formik.errors.members}</p>
        ) : null}
        <BroadcastTabSection callback={handleSelectedMembers} />
      </Modal>
    </div>
  );
};

export default BroadcastModel;
