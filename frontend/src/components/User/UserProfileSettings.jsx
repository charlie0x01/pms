import React, { useState } from "react";
import NewProjectModal from "../Project/NewProject";
import NewTeamModal from "../Team/NewTeamModal";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfileSettings = () => {
  const [addProject, setAddProject] = useState(false);
  const [addTeam, setaddTeam] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      avatar: "https://bulma.io/images/placeholders/128x128.png",
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
      oldPassword: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
      newPassword: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-z0-9]/, "Password can only contain Latin letters."),
      // confirmPassword: Yup.string()
      //   .required("No password provided.")
      //   .matches(`/[${formik.values.oldPassword}]/`, "Password does not match"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <section class="section">
        <div class="container">
          <h1 class="title">User Profile</h1>
          <form>
            <div class="field is-flex is-align-items-center is-gap-3">
              <figure class="image is-128x128">
                <img className="is-rounded" src={formik.values.avatar} />
              </figure>
              <div class="control">
                <input
                  id="avatar"
                  onChange={(e) => {
                    formik.setFieldValue("avatar", e.currentTarget.files[0]);
                    console.log(formik.values.avatar);
                  }}
                  class="input"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your last name"
                  {...formik.getFieldProps("firstName")}
                />
              </div>
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="has-text-danger">{formik.errors.firstName}</div>
            ) : null}
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your last name"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="has-text-danger">{formik.errors.lastName}</div>
            ) : null}
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Enter your email address"
                  {...formik.getFieldProps("email")}
                />
              </div>
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="has-text-danger">{formik.errors.email}</div>
            ) : null}
            <div className="columns is-1 is-desktop">
              <div class="field column">
                <label class="label"> old Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps("oldPassword")}
                  />
                </div>
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <div className="has-text-danger">
                  {formik.errors.oldPassword}
                </div>
              ) : null}
              <div class="field column">
                <label class="label"> New Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps("newPassword")}
                  />
                </div>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="has-text-danger">
                  {formik.errors.newPassword}
                </div>
              ) : null}
              <div class="field column">
                <label class="label"> Confirm Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </div>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="has-text-danger">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <div className="column">
                <button className="button">Change Password</button>
              </div>
            </div>
            <div class="field">
              <label class="label">Bio</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Enter a short bio about yourself"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserProfileSettings;
