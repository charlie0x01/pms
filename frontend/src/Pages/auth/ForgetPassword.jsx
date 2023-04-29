import React from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
      <div
        className="box"
        style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
      >
        <h1 className="title">Forget Password</h1>
        <form>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                onClick={() => navigate("/confirm-otp")}
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
};

export default ForgetPassword;
