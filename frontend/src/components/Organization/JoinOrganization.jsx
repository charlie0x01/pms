import React, { useEffect } from "react";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

// apis
import { useJoinOrganizationMutation } from "../../apis/orgApi";
import { delay } from "../../../utils";

const JoinOrganization = ({ setIsOpen }) => {
  const [messageApi, contextHandler] = message.useMessage();
  // join organization
  const [
    joinOrganization,
    { isLoading, isError, isSuccess, error, data: joinResponse },
  ] = useJoinOrganizationMutation();

  const formik = useFormik({
    initialValues: {
      joiningCode: "",
    },
    validationSchema: Yup.object({
      joiningCode: Yup.string()
        .min(8, "Invalid code")
        .max(8, "invalid code")
        .required("Required"),
    }),
    onSubmit: (values) => {
      joinOrganization({
        joiningCode: values.joiningCode,
        memberId: localStorage.getItem("user_id"),
      });

      formik.resetForm();
    },
  });

  useEffect(() => {
    async function handleErrors() {
      if (isError) {
        if (Array.isArray(error?.data.error)) {
          error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error?.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(joinResponse?.message);
        await delay(2000);
        setIsOpen(false);
      }
    }

    handleErrors();
  }, [isLoading]);

  return (
    <>
      {contextHandler}
      <form onSubmit={formik.handleSubmit}>
        <div class="field">
          <label class="label">Join Code</label>
          <div class="control">
            <input
              id="joiningCode"
              class="input"
              type="text"
              placeholder="Enter you join code"
              {...formik.getFieldProps("joiningCode")}
            />
          </div>
        </div>
        {formik.touched.joiningCode && formik.errors.joiningCode ? (
          <div className="has-text-danger">{formik.errors.joiningCode}</div>
        ) : null}
        <button type="submit" className="button is-primary">
          Join
        </button>
      </form>
    </>
  );
};

export default JoinOrganization;
