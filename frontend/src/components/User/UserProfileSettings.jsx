import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../common/Modal";
import axios from "axios";
import { message } from "antd";
import DeleteUser from "./DeleteUser";
import moment from "moment";

// apis
import {
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "../../apis/authApi";

function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const UserProfileSettings = () => {
  const [messageApi, contextHandler] = message.useMessage();
  const [uploadPP, setUploadPP] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const defaultImage = "https://bulma.io/images/placeholders/128x128.png";
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 4 * 1000 * 1000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const onFileUpload = (Image) => {
    // Create an object of formData
    const formData = new FormData();

    console.log(Image);

    // let profile = new Blob([Image], { type: "image/png" });

    // // Update the formData object
    formData.append("profileImage", avatar.preview);
    formData.append("email", `${localStorage.getItem("user_email")}`);

    // // Request made to the backend api
    // // Send formData object
    axios
      .post("http://localhost:5000/uploadProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        localStorage.setItem(
          "profile_picture",
          Response.data.user.profile_picture
        );
        messageApi.success(Response?.data.message);
      })
      .catch((error) =>
        messageApi.error("something went wrong please try again!")
      );
  };

  const onCrop = (preview) => {
    formik.setFieldValue("avatar", preview);
    setAvatar({ preview });
  };

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

  // update user
  const [
    updateUser,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
      error: _error,
      data: udpateResponse,
    },
  ] = useUpdateUserMutation();

  // get user
  const { data: user } = useGetUserQuery(localStorage.getItem("user_id"));

  const formik = useFormik({
    initialValues: {
      // firstName: localStorage.getItem("first_name"),
      // lastName: localStorage.getItem("last_name"),
      // email: localStorage.getItem("user_email"),
      // dob: localStorage.getItem("dob"),
      // avatar: defaultImage,
      firstName: user?.data.first_name,
      lastName: user?.data.last_name,
      email: user?.data.email,
      dob: user?.data.dob,
      bio: user?.data.bio,
      avatar: user?.data.profile_picture || defaultImage,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 4 to 15 characters long")
        .min(3, "Must be 4 to 15 characters long")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 4 to 20 characters long")
        .min(3, "Must be 4 to 20 characters long")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      dob: Yup.string().test("DOB", "you're younger than 12 years", (value) => {
        return moment().diff(value, "years") > 12;
      }),
    }),
    onSubmit: (values) => {
      updateUser({ id: localStorage.getItem("user_id"), user: { ...values } });
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
    if (updateError) {
      if (Array.isArray(_error?.data.error)) {
        _error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(_error?.data.message);
      }
    }
    if (updateSuccess) {
      messageApi.success(udpateResponse?.message);
      localStorage.setItem("first_name", formik.values.firstName);
      localStorage.setItem("last_name", formik.values.lastName);
      localStorage.setItem("user_email", formik.values.email);
      localStorage.setItem("dob", formik.values.dob);

      formik.resetForm();
    }
  }, [updateLoading]);

  // reset password
  useEffect(() => {
    if (resetError) {
      if (Array.isArray(reset_error?.data.error)) {
        reset_error?.data.error.forEach((el) => messageApi.error(el.message));
      } else {
        messageApi.error(reset_error?.data.message);
      }
    }
    if (resetSuccess) {
      messageApi.success(resetReponse?.message);
      resetFormik.resetForm();
    }
  }, [resetLoading]);

  return (
    <>
      {contextHandler}
      <section class="section">
        <div class="container">
          <h1 class="title">User Profile Settings</h1>
          <div className="is-flex">
            <div class="field is-flex is-flex-direction-column is-align-items-center is-gap-3 mr-3">
              <figure class="image is-128x128">
                <img
                  className="is-rounded"
                  src={formik.values.avatar}
                  alt="avatar"
                />
              </figure>
              {/* <input
                type="file"
                name="profileImage"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => onFileUpload(e.target.files[0])}
              /> */}
              <button className="button" onClick={() => setUploadPP(true)}>
                Update Profile Picture
              </button>
            </div>
            <div style={{ width: "100%" }}>
              <form onSubmit={formik.handleSubmit}>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">First Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Enter Task Title"
                          {...formik.getFieldProps("firstName")}
                        />
                      </div>
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <p className="help is-danger">
                          {formik.errors.firstName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Last Name</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Enter Task Title"
                          {...formik.getFieldProps("lastName")}
                        />
                      </div>
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <p className="help is-danger">
                          {formik.errors.lastName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Email</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Enter Task Title"
                          {...formik.getFieldProps("email")}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <p className="help is-danger">{formik.errors.email}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Date of Birth</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="date"
                          placeholder="Enter Task Title"
                          {...formik.getFieldProps("dob")}
                        />
                      </div>
                      {formik.touched.dob && formik.errors.dob ? (
                        <p className="help is-danger">{formik.errors.dob}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Bio</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <textarea
                          class="input"
                          type="text"
                          placeholder="Description or Bio"
                          {...formik.getFieldProps("bio")}
                          rows={5}
                          style={{ minHeight: 100 }}
                        />
                      </div>
                      {formik.touched.bio && formik.errors.bio ? (
                        <p className="help is-danger">{formik.errors.bio}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="button is-primary is-pulled-right"
                >
                  Update Profile
                </button>
              </form>
              <button
                onClick={() => setIsOpen(true)}
                className="button is-danger is-outlined is-pulled-right mr-3"
              >
                Delete User Profile
              </button>
            </div>
          </div>
          <form class="columns mt-3" onSubmit={resetFormik.handleSubmit}>
            <div class="column">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">New Password</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="password"
                        placeholder="New Password"
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
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">Confirm Password</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="password"
                        placeholder="Confirm Password"
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
                </div>
              </div>
            </div>
            <div class="column">
              <button type="submit" className="button">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </section>
      <DeleteUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        captcha={generateRandomString()}
      />
      <Modal show={uploadPP}>
        <Avatar
          width={350}
          height={295}
          onCrop={onCrop}
          onBeforeFileLoad={(e) => onBeforeFileLoad(e)}
          src={image}
        />
        <button
          className="button mt-3"
          onClick={() => {
            onFileUpload();
            setUploadPP(false);
          }}
        >
          Save
        </button>
        <button
          className="button mt-3"
          onClick={() => {
            formik.setFieldValue("avatar", defaultImage);
            setUploadPP(false);
          }}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default UserProfileSettings;
