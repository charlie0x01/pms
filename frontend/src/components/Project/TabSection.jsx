import React, { useEffect, useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import { message } from "antd";
import MemberCard from "./MemberCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import AddMember from "./AddMember";

// apis
import { useGetMembersQuery } from "../../apis/projectApi";

const TabSection = ({ projectId }) => {
  const isOwnerOrAdmin =
    localStorage.getItem("project_role") == 2 ||
    localStorage.getItem("project_role") == null;
  const isTeamLead = localStorage.getItem("project_role") == 3;
  const [activeTab, setActiveTab] = useState("Members");
  const [addMember, setAddMember] = useState(false);
  // get members
  const {
    isLoading,
    error,
    data: members,
  } = useGetMembersQuery(useParams().projectId);
  // toast message
  const [messageApi, contextHandler] = message.useMessage();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (error) messageApi.error(error?.data.message);
  }, [isLoading]);
  return (
    <div className="mt-5">
      {contextHandler}
      <TabBar
        tabs={["Members"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Members" && (
          <div>
            {(isOwnerOrAdmin || isTeamLead) && (
              <div className="pb-3">
                <button onClick={() => setAddMember(true)} className="button">
                  Invite Member
                </button>
              </div>
            )}
            {isLoading === true ? (
              <LoadingSpinner />
            ) : (
              <>
                {members?.data.length > 0 &&
                  members?.data.map((member, index) => {
                    return (
                      <MemberCard
                        key={index}
                        memberId={member.user_id}
                        name={`${member.first_name} ${member.last_name}`}
                        email={member.email}
                        projectId={projectId}
                        status={member.member_status}
                        memberRoleId={member.pm_role_id}
                        profilePicture={member.profile_picture}
                      />
                    );
                  })}
              </>
            )}
          </div>
        )}
      </ContentPanel>
      <AddMember
        isOpen={addMember}
        setIsOpen={setAddMember}
        projectId={useParams().projectId}
      />
    </div>
  );
};

export default TabSection;
