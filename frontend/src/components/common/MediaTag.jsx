import React from "react";
import Avatar from "react-avatar";

const MediaTag = ({ name, email, profilePicture }) => {
  return (
    <div className="media p-2 box" style={{ margin: 5 }}>
      <div className="media-left">
        <Avatar
          maxInitials={1}
          name={name}
          src={profilePicture}
          round
          size="28"
          textSizeRatio={1.9}
        />
      </div>
      <div className="media-content">
        <p className="title is-6">{name}</p>
      </div>
    </div>
  );
};

export default MediaTag;
