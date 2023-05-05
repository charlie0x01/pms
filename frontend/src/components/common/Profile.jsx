import React from "react";

const Profile = ({ avatar, fullname, email, description }) => {
  return (
    <div class="media mt-5">
      <div class="media-left">
        <figure class="image is-128x128">
          <img src={avatar} alt="Placeholder image" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{fullname}</p>
        <p class="subtitle is-6">{email}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Profile;
