import React from "react";

const NewPassword = () => {
  return (
    <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
      <div
        className="box"
        style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
      >
        <h1 className="title">New Password</h1>
        <form>
          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter your new password"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="confirm password"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                onClick={() => alert("password saved!!")}
                className="button is-primary is-fullwidth"
              >
                Save Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
