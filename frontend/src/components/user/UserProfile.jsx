import React, { useState } from "react";
import NewProjectModal from "../project/NewProjectModal";
import NewTeamModal from "../team/NewTeamModal";
import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

const UserProfile = () => {
  const [addProject, setAddProject] = useState(false);
  const [addTeam, setaddTeam] = useState(false);
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     projectName: Yup.string()
  //       .min(4, "Must be 4 characters or more")
  //       .required("Required"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <>
      <NewProjectModal setIsOpen={setAddProject} isOpen={addProject} />
      <NewTeamModal setIsOpen={setaddTeam} isOpen={addTeam} />
      <section class="section">
        <div class="container">
          <h1 class="title">User Profile</h1>
          <form>
            <div class="field is-flex is-align-items-center is-gap-3">
              <figure class="image is-128x128">
                <img
                  className="is-rounded"
                  src="https://gravatar.com/avatar/6cc732b7d567902fe51e24b0c909c97d?s=400&d=robohash&r=x"
                />
              </figure>
              <div class="control">
                <input class="input" type="file" />
              </div>
            </div>
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div className="columns is-1 is-desktop">
              <div class="field column">
                <label class="label"> old Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div class="field column">
                <label class="label"> New Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div class="field column">
                <label class="label"> Confirm Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="column">
                <Link to="/forget-password" className="button">
                  Change Password
                </Link>
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
        <div className="container mt-5">
          <div className="is-flex is-justify-content-space-between">
            <h1 className="title">Projects</h1>
            <button onClick={() => setAddProject(true)} className="button">
              Create New Project
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div className="is-flex is-justify-content-space-between">
            <h1 className="title">Teams</h1>
            <button onClick={() => setaddTeam(true)} className="button">
              Create New Team
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
