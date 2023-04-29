import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import _404Page from "./Pages/_404Page";
import App from "./App";
import ForgetPassword from "./Pages/auth/ForgetPassword";
import OTP from "./Pages/auth/OTP";
import NewPassword from "./Pages/auth/NewPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/confirm-otp" element={<OTP />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="*" element={<_404Page />} />
    </Routes>
  );
};

export default AppRoutes;
