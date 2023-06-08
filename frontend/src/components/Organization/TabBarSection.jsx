import React, { useEffect, useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import { message } from "antd";
import MemberCard from "./MemberCard";

// apis
import { useGetMembersQuery } from "../../apis/orgApi";
import LoadingSpinner from "../common/LoadingSpinner";
import AddMember from "./AddMember";

const TabBarSection = ({ orgId }) => {
  const isOwnerOrAdmin =
    localStorage.getItem("org_role") == 2 ||
    localStorage.getItem("org_role") == null;
  const [activeTab, setActiveTab] = useState("Members");
  const [addMember, setAddMember] = useState(false);

  // get members
  const { isLoading, error, data: members } = useGetMembersQuery(orgId);
  // toast message
  const [messageApi, contextHandler] = message.useMessage();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (error) messageApi.error(error?.data.message);
  }, [error]);
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
            <div className="pb-3">
              {isOwnerOrAdmin && (
                <button onClick={() => setAddMember(true)} className="button">
                  Invite Member
                </button>
              )}
            </div>
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
                        orgId={orgId}
                        status={member.member_status}
                        memberRoleId={member.om_role_id}
                        profilePicture={member.profile_picture}
                      />
                    );
                  })}
              </>
            )}
          </div>
        )}
      </ContentPanel>
      <AddMember isOpen={addMember} setIsOpen={setAddMember} orgId={orgId} />
    </div>
  );
};

export default TabBarSection;
