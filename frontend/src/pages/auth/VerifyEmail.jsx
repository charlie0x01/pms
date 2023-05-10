import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useVerifyEmailMutation,
  useGetNewVerificationCodeMutation,
} from "../../apis/authApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { message } from "antd";
import { delay } from "../../../utils";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [verifyEmail, { isLoading, isError, error, isSuccess, data }] =
    useVerifyEmailMutation();
  const [
    getNewVerificationCode,
    {
      isLoading: is_Loading,
      error: err,
      data: response,
      isError: is_Error,
      isSuccess: is_Success,
    },
  ] = useGetNewVerificationCodeMutation();

  const [messageApi, contextHandler] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .min(8, "verification code is only 8 characters long")
        .max(8, "verification code is only 8 characters long")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values.verificationCode);
      verifyEmail({ verificationCode: values.verificationCode });
    },
  });

  // request new verification code
  const requestNewVerificationCode = () => {
    const email = localStorage.getItem("user_email");
    getNewVerificationCode({ email });
  };

  useEffect(() => {
    async function toDo() {
      if (isError) {
        if (Array.isArray(error?.data.error)) {
          error.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(error.data.message);
        }
      }
      if (isSuccess) {
        messageApi.success(data?.message);
        localStorage.clear();
        await delay(2000);
        navigate("/signin");
      }
    }

    toDo();
  }, [isLoading]);

  useEffect(() => {
    async function toDo() {
      if (is_Error) {
        if (Array.isArray(err.data.error)) {
          err.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(err.data.message);
        }
      }
      if (is_Success) {
        messageApi.success(response?.message);
      }
    }

    toDo();
  }, [is_Loading]);

  return (
    <>
      {contextHandler}
      <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
        <div
          className="box"
          style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
        >
          <h1 className="title">Verify Email</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  id="verificationCode"
                  className="input"
                  type="text"
                  placeholder="Enter the verification code"
                  {...formik.getFieldProps("verificationCode")}
                />
              </div>
              {formik.touched.verificationCode &&
              formik.errors.verificationCode ? (
                <div className="has-text-danger">
                  {formik.errors.verificationCode}
                </div>
              ) : null}
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary is-fullwidth"
                >
                  {isLoading === true ? <LoadingSpinner /> : "Verify"}
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={requestNewVerificationCode}
            className="button is-primary is-fullwidth mt-1"
          >
            Send Again
          </button>
          <p className="subtitle is-6 mt-1">
            Verification code is sent to your email
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
