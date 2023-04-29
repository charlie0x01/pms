import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
      <div
        className="box"
        style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
      >
        <h1 className="title">Sign In</h1>
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
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="has-text-danger">{formik.errors.email}</div>
          ) : null}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="has-text-danger">{formik.errors.password}</div>
          ) : null}
          <Link to="/forget-password" className="is-pulled-right mb-1">
            forget password
          </Link>
          <div className="field">
            <div className="control">
              <button className="button is-primary is-fullwidth">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div className="mt-2">
          don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
