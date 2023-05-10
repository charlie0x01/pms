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
