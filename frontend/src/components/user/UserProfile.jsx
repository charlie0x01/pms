import React from "react";
import Profile from "../common/Profile.jsx";
import TabBarSection from "./TabBarSection.jsx";

// apis
import { useGetUserQuery } from "../../apis/authApi.js";

const UserProfile = () => {
  // get user
  const { data: user } = useGetUserQuery(localStorage.getItem("user_id"));

  const defaultAvatar = "https://bulma.io/images/placeholders/128x128.png";
  const userAvatar = user?.data.profile_picture
    ? user?.data.profile_picture
    : defaultAvatar;
  return (
    <div className="section">
      <div className="container">
        <h1 class="title mb-5">User Profile</h1>
        <Profile
          avatar={userAvatar}
          fullname={`${user?.data.first_name} ${user?.data.last_name}`}
          email={user?.data.email}
          description={user?.data.bio}
          dob={user?.data.dob}
        />
        <TabBarSection />
      </div>
    </div>
  );
};

export default UserProfile;
