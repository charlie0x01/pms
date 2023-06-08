import React, { useState } from "react";
import TabBar from "../../TabBar/Tabbar";
import ContentPanel from "../../TabBar/ContentPanel";

import SelectableTable from "./SelectableTable";

// apis
import {
  useGetOrganizationsQuery,
  useGetMembersQuery,
} from "../../../apis/orgApi";
import ProjectMembers from "./ProjectMembers";

const BroadcastTabSection = ({ callback }) => {
  const [orgId, setOrgId] = useState(null);

  const [activeTab, setActiveTab] = useState("Broadcast to Members");

  // get organizations
  const { data: organizations } = useGetOrganizationsQuery(
    localStorage.getItem("user_id")
  );

  // get org members
  const { data: orgMembers } = useGetMembersQuery(orgId, { skip: !orgId });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOrgSelect = (value) => {
    if (value !== "--Select Organization--") {
      setOrgId(value);
    }
  };

  return (
    <div className="mt-5">
      <TabBar
        tabs={["Broadcast to Members"]}
        defaultTab={activeTab}
        onTabChange={handleTabChange}
      />

      <ContentPanel tab={activeTab}>
        {activeTab === "Broadcast to Members" && (
          <div>
            <div className="select mb-3">
              <select onChange={(e) => handleOrgSelect(e.target.value)}>
                <option>--Select Organization--</option>
                {organizations && (
                  <>
                    {organizations?.data.map((org, index) => (
                      <option value={org.org_id}>{org.org_name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <SelectableTable callBack={callback} members={orgMembers} />
          </div>
        )}
      </ContentPanel>
    </div>
  );
};

export default BroadcastTabSection;
