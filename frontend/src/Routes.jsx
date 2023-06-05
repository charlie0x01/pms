import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import _404Page from "./pages/_404Page";
import App from "./App";
import ForgetPassword from "./pages/auth/ForgetPassword";
import UserProfileSettings from "./components/User/UserProfileSettings";
import UserProfile from "./components/User/UserProfile";
import ProjectProfile from "./components/Project/ProjectProfile";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProjectView from "./components/Organization/ProjectView";
import Board from "./components/Kanban/Board";
import ProtectedRoute from "./components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="/user-profile" replace />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="user-profile-settings" element={<UserProfileSettings />} />
        <Route path="project-profile" element={<ProjectProfile />} />
        <Route path="organization/:orgId" element={<ProjectView />} />
        <Route path="kanban/:projectId" element={<Board />} />
      </Route>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="*" element={<_404Page />} />
    </Routes>
  );
};

export default AppRoutes;
