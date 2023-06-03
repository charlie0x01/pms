import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

// apis
import { useGetMembersQuery } from "../../apis/projectApi";

function ProjectCard({ title, description, date, id, link }) {
  // get members
  const { isLoading, error, data: members } = useGetMembersQuery(id);
  return (
    <Link to={link}>
      <div className="box p-3" style={{ width: 350 }}>
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
                  {!isLoading &&
                    members &&
                    members?.data.map((member, index) => {
                      return (
                        <Avatar
                          key={index}
                          maxInitials={2}
                          className="avatar"
                          name={`${member.first_name} ${member.last_name}`}
                          round
                          size="22"
                          textSizeRatio={1.9}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2 mb-1 subtitle is-size-6 ellipsis">{description}</p>
          {/* <hr className="m-1" />
          <p className="is-size-7 has-text-weight-semibold">
            Created Date: May 29, 2023
          </p> */}
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
