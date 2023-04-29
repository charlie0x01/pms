import { Link } from "react-router-dom";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 4 to 15 characters long")
        .min(4, "Must be 4 to 15 characters long")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 4 to 20 characters long")
        .min(4, "Must be 4 to 20 characters long")
        .required("Required"),
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
        <h1 className="title">Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                id="firstName"
                className="input"
                type="text"
                placeholder="Enter your last name"
                {...formik.getFieldProps("firstName")}
              />
            </div>
          </div>
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="has-text-danger">{formik.errors.firstName}</div>
          ) : null}
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                id="lastName"
                className="input"
                type="text"
                placeholder="Enter your last name"
                {...formik.getFieldProps("lastName")}
              />
            </div>
          </div>
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="has-text-danger">{formik.errors.lastName}</div>
          ) : null}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                id="email"
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
                id="password"
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
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary is-fullwidth">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="mt-2">
          already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
