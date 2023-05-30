import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

function ProjectCard({ title, description, date, id, link }) {
  const checkDueDate = (date) => {};
  return (
    <Link to={link}>
      <div className="box p-3" style={{ maxWidth: 350 }}>
        <div className="is-flex is-flex-direction-column">
          {/* media */}
          <div className="media">
            <div className="media-left">
              <Avatar
                maxInitials={1}
                name={title}
                size="60"
                round="10px"
                textSizeRatio={1.9}
              />
            </div>
            <div className="media-content">
              <p className="title is-5 ellipsis-title">{title}</p>
              <div className="subtitle">
                <div class="avatars">
                  <Avatar
                    className="avatar"
                    name="PMS"
                    round
                    size="22"
                    textSizeRatio={1.9}
                  />
                  <Avatar
                    className="avatar"
                    name="PMS"
                    round
                    size="22"
                    textSizeRatio={1.9}
                  />
                  <Avatar
                    className="avatar"
                    name="PMS"
                    round
                    size="22"
                    textSizeRatio={1.9}
                  />
                  <Avatar
                    className="avatar"
                    name="PMS"
                    round
                    size="22"
                    textSizeRatio={1.9}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2 mb-1 subtitle is-size-6 ellipsis">{description}</p>
          <hr className="m-1" />
          <p className="is-size-6 has-text-weight-semibold">
            Due Date: May 29, 2023
          </p>
          <div className="is-flex is-flex-direction-row">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
