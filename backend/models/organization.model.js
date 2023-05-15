require("dotenv").config();
const { pool, transaction } = require("../config/database");

class organization {
  constructor(org_name, org_owner, description) {
    this.org_name = org_name;
    this.org_owner = org_owner;
    this.description = description;
  }

  save() {
    let addOrganization = `insert into organizations(org_name, org_owner, description) values(?, ?, ""); `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addOrganization, [
          this.org_name,
          this.org_owner,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByOwner(owner) {
    let getOrganizations = `select * from organizations where org_owner = ?`;
    return pool.execute(getOrganizations, [owner]);
  }
}

module.exports = organization;
require("dotenv").config();
const { pool, transaction } = require("../config/database");

class organization {
  constructor(org_name, org_owner, description) {
    this.org_name = org_name;
    this.org_owner = org_owner;
    this.description = description;
  }

  save() {
    let addOrganization = `insert into organizations(org_name, org_owner, description) values(?, ?, ""); `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addOrganization, [
          this.org_name,
          this.org_owner,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static updateOrganization(orgID, organizationName, organizationOwner, description) {
    let updateOrg = `update organizations set org_name = ?, org_owner = ?, description = ? where org_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(updateOrg, [
          organizationName,
          organizationOwner,
          description,
          orgID,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteOrganization(orgID, ownerID) {
    let deleteOrg = `delete from organizations where org_id = ? and org_owner = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(deleteOrg, [
          orgID,
          ownerID
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByOwner(owner) {
    let getOrganizations = `select * from organizations where org_owner = ?`;
    return pool.execute(getOrganizations, [owner]);
  }

  static findByOrganizationID(org_id) {
    let getOrganizations = `select * from organizations where org_id = ?`;
    return pool.execute(getOrganizations, [org_id]);
  }
}

module.exports = organization;
