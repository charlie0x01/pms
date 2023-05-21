import React, { useEffect, useState } from "react";
import TabBar from "../TabBar/Tabbar";
import ContentPanel from "../TabBar/ContentPanel";
import { message } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import MemberCard from "../common/MemberCard";

// apis
import { useGetMembersQuery } from "../../apis/orgApi";
import LoadingSpinner from "../common/LoadingSpinner";
import AddMember from "./AddMember";

const TabBarSection = ({ orgId }) => {
  const [activeTab, setActiveTab] = useState("Tab 1");
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
        tabs={["Members", "Notifications", "Activies"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Members" && (
          <div>
            <div className="pb-3">
              <button onClick={() => setAddMember(true)} className="button">
                Invite Member
              </button>
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
                      />
                    );
                  })}
              </>
            )}
          </div>
        )}

        {activeTab === "Notifications" && (
          <div>
            <h2>Content for Notifications</h2>
            <p>This is the content panel for Notifications.</p>
          </div>
        )}

        {activeTab === "Activies" && (
          <div>
            <h2>Content for Activies</h2>
            <p>This is the content panel for Activies.</p>
          </div>
        )}
      </ContentPanel>
      <AddMember isOpen={addMember} setIsOpen={setAddMember} orgId={orgId} />
    </div>
  );
};

export default TabBarSection;
