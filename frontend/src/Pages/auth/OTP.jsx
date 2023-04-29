import React from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();

  return (
    <div className="hero has-background-primary is-fullheight is-flex is-justify-content-center is-align-items-center">
      <div
        className="box"
        style={{ maxWidth: 480, minWidth: 430, padding: "40px" }}
      >
        <h1 className="title">Confirm OTP</h1>
        <form>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your OTP"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                onClick={() => navigate("/new-password")}
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
};

export default OTP;
