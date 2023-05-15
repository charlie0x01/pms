import React from "react";
import Profile from "../common/Profile.jsx";
import TabBarSection from "./TabBarSection.jsx";

const UserProfile = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 class="title">User Profile</h1>
        <Profile
          avatar="https://bulma.io/images/placeholders/128x128.png"
          fullname="John Smith"
          email="johnsmith@example.com"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive"
        />
        <TabBarSection />
      </div>
    </div>
  );
};

export default UserProfile;
