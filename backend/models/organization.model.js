require("dotenv").config();
const { pool, transaction } = require("../config/database");
const { v4: uuid } = require("uuid");

class organization {
  constructor(org_name, org_owner, description) {
    this.org_name = org_name;
    this.org_owner = org_owner;
    this.description = description;
  }

  save() {
    // generate joining code
    const joiningCode = uuid().slice(0, 8);
    let addOrganization = `insert into organizations(org_name, org_owner, description, joining_code) values(?, ?, "", ?); `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addOrganization, [
          this.org_name,
          this.org_owner,
          joiningCode,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static updateOrganization(orgID, organizationName, description) {
    let updateOrg = `update organizations set org_name = ?, description = ? where org_id = ?;`;
    return pool.execute(updateOrg, [organizationName, description, orgID]);
  }

  static deleteOrganization(orgId, ownerId) {
    let deleteOrg = `delete from organizations where org_id = ? and org_owner = ? `;
    return pool.execute(deleteOrg, [orgId, ownerId]);
  }

  static findByUserId(userId) {
    let getOrganizations = `SELECT * FROM organizations WHERE org_owner = ? 
    UNION 
    SELECT o.* FROM organizations o
    INNER JOIN organization_members m ON o.org_id = m.org_id
    WHERE m.org_member_id = ? and m.member_status = 1;`;

    return pool.execute(getOrganizations, [userId, userId]);
  }

  static checkAdminOrOwner(orgId, userId) {
    let checkAO = `select om.* from organizations o
    right join organization_members om on o.org_id = om.org_id
    where o.org_owner = ? and o.org_id = ?
    or (om.org_member_id = ? and (om.om_role_id = 1 or om.om_role_id = 2) and om.member_status = 1);`;

    return pool.execute(checkAO, [userId, orgId, userId]);
  }
  static findByName(name) {
    let findbyname = `select * from organizations where org_name = ?;`;
    return pool.execute(findbyname, [name]);
  }

  static findByOwner(owner) {
    let getOrganizations = `select * from organizations where org_owner = ?`;
    return pool.execute(getOrganizations, [owner]);
  }

  static findByOrganizationID(org_id) {
    let getOrganizations = `select * from organizations where org_id = ?`;
    return pool.execute(getOrganizations, [org_id]);
  }

  // add members in organization
  static addMember(orgId, memberId) {
    let query = `insert into organization_members(org_id, org_member_id, description, member_status, om_role_id) values(?, ?, "", 0, 4); `;
    // check if user exist or not
    return pool.execute(query, [orgId, memberId]);
  }

  static joinOrganization(orgId, memberId) {
    let joinOrganization = `update organization_members set member_status = 1 where org_id = ? and org_member_id = ?;`;
    return pool.execute(joinOrganization, [orgId, memberId]);
  }

  static setJoiningCode(joiningCode, orgId) {
    let setJoiningCode = `update organizations set joining_code = ? where org_id = ?;`;
    return pool.execute(setJoiningCode, [joiningCode, orgId]);
  }

  static findByJoiningCode(joiningCode) {
    let getOrganization = `select * from organizations where joining_code = ?`;
    return pool.execute(getOrganization, [joiningCode]);
  }
  static getMembers(orgId) {
    let getMembers = `select user.first_name, user.last_name, user.email, user.user_id, om.member_status from organization_members as om join users as user on user.user_id = om.org_member_id where om.org_id = ?;`;
    return pool.execute(getMembers, [orgId]);
  }
  static findByMemberAndOrganizationId(orgId, memberId) {
    let getOrganization = `select * from organization_members where org_member_id = ? and org_id = ?;`;
    return pool.execute(getOrganization, [memberId, orgId]);
  }

  static removeMember(orgId, memberId) {
    let removeMember = `delete from organization_members where org_member_id = ? and org_id = ?`;
    let removeOrgMembers = `delete from project_members where project_member_id = ?;`;
    try {
      transaction(pool, async (connection) => {
        await connection.execute(removeOrgMembers, [memberId]);
        await connection.execute(removeMember, [memberId, orgId]);
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = organization;
