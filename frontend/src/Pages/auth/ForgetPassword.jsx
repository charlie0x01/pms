import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";

// apis
import {
  useForgotPasswordMutation,
  useVerifyForgetPasswordOTPMutation,
  useResetPasswordMutation,
} from "../../apis/authApi";
import { delay } from "../../../utils";

const ForgetPassword = () => {
  const [formState, setFormState] = useState(0);
  const [messageApi, contextHandler] = message.useMessage();
  const navigate = useNavigate();

  // forget password api
  const [
    forgotPassword,
    { isLoading, isError, isSuccess, error, data: forgetPasswordResponse },
  ] = useForgotPasswordMutation();

  // varify otp forget password
  const [
    verifyForgetPasswordOTP,
    {
      isLoading: optLoading,
      isError: otpError,
      isSuccess: otpSuccess,
      error: otp_error,
      data: otpReponse,
    },
  ] = useVerifyForgetPasswordOTPMutation();

  // reset password
  const [
    resetPassword,
    {
      isLoading: resetLoading,
      isError: resetError,
      isSuccess: resetSuccess,
      error: reset_error,
      data: resetReponse,
    },
  ] = useResetPasswordMutation();

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      forgotPassword(values.email);
    },
  });

  // otp form hook
  const optFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .min(4, "Invalid OTP")
        .max(4, "invalid OTP")
        .required("Please provide OTP to reset password"),
    }),
    onSubmit: (values) => {
      verifyForgetPasswordOTP({ email: formik.values.email, otp: values.otp });
    },
  });

  // reset password
  const resetFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Please enter new password.")
        .min(8, "Your password is too short.")
        .matches(
          /[a-zA-Z0-9]/,
          "Password can only contain letters and numbers."
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password.")
        .oneOf([Yup.ref("newPassword")], "Your passwords do not match."),
    }),
    onSubmit: (values) => {
      resetPassword({
        email: formik.values.email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
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
        console.log(forgetPasswordResponse);
        messageApi.success(forgetPasswordResponse?.message);
        await delay(1000);
        setFormState(formState + 1);
      }
    }

    handleErrors();
  }, [isLoading]);

  // opt
  useEffect(() => {
    async function handleErrors() {
      if (otpError) {
        if (Array.isArray(otp_error?.data.error)) {
          otp_error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(otp_error?.data.message);
        }
      }
      if (otpSuccess) {
        messageApi.success(otpReponse?.message);
        await delay(1000);
        setFormState(formState + 1);
      }
    }

    handleErrors();
  }, [optLoading]);

  // reset password
  useEffect(() => {
    async function handleErrors() {
      if (resetError) {
        if (Array.isArray(reset_error?.data.error)) {
          reset_error?.data.error.forEach((el) => messageApi.error(el.message));
        } else {
          messageApi.error(reset_error?.data.message);
        }
      }
      if (resetSuccess) {
        messageApi.success(resetReponse?.message);
        await delay(500);
        navigate("/signin");
      }
    }

    handleErrors();
  }, [resetLoading]);

  const getForm = () => {
    if (formState === 0) {
      return (
        <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
          <div
            className="box"
            style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
          >
            <h1 className="title">Forget Password</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <p className="help is-danger">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="field">
                <div className="control">
                  <button
                    // onClick={() => navigate("/confirm-otp")}
                    type="submit"
                    className="button is-primary is-fullwidth"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (formState === 1) {
      return (
        <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
          <div
            className="box"
            style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
          >
            <h1 className="title">Confirm OTP</h1>
            <form onSubmit={optFormik.handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your OTP"
                    {...optFormik.getFieldProps("otp")}
                  />
                </div>
                {optFormik.touched.otp && optFormik.errors.otp ? (
                  <p className="help is-danger">{optFormik.errors.otp}</p>
                ) : null}
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary is-fullwidth"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else if (formState === 2) {
      return (
        <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
          <div
            className="box"
            style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
          >
            <h1 className="title">New Password</h1>
            <form onSubmit={resetFormik.handleSubmit}>
              <div className="field">
                <label className="label">New Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter your new password"
                    {...resetFormik.getFieldProps("newPassword")}
                  />
                </div>
                {resetFormik.touched.newPassword &&
                resetFormik.errors.newPassword ? (
                  <p className="help is-danger">
                    {resetFormik.errors.newPassword}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="confirm password"
                    {...resetFormik.getFieldProps("confirmPassword")}
                  />
                </div>
                {resetFormik.touched.confirmPassword &&
                resetFormik.errors.confirmPassword ? (
                  <p className="help is-danger">
                    {resetFormik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary is-fullwidth"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      <Navigate to="/signin" replace={true} />;
    }
  };

  return (
    <>
      {contextHandler}
      {getForm()}
    </>
  );
};

export default ForgetPassword;
