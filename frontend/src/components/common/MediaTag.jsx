import React from "react";
import Avatar from "react-avatar";

const MediaTag = ({ name, email, profilePicture }) => {
  return (
    <div
      className="is-flex is-align-items-center p-2 is-gap-1 box"
      style={{ maxHeight: 40 }}
    >
      <div className="">
        <Avatar
          maxInitials={1}
          name={name}
          src={profilePicture}
          round
          size="28"
          textSizeRatio={1.9}
        />
      </div>
      <div className="">
        <p className="title is-size-6">{name}</p>
      </div>
    </div>
  );
};

export default MediaTag;
