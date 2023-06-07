import React from "react";

const Profile = ({ avatar, fullname, email, description, dob }) => {
  return (
    <div class="media mt-5">
      <div class="media-left">
        <figure class="image is-128x128">
          <img className="is-rounded" src={avatar} alt="avatar" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{fullname}</p>
        <p class="subtitle is-size-6">{email}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Profile;
