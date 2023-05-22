require("dotenv").config();
const { pool, transaction } = require("../config/database");

class Project {
  constructor(org_id, project_owner, project_title, created_date, description) {
    this.org_id = org_id;
    this.project_owner = project_owner;
    this.project_title = project_title;
    this.created_date = created_date;
    this.description = description;
  }

  save() {
    let addProject = `insert into projects(org_id, project_owner, description, project_title, created_date) values(?, ?, "", ?, ?); `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addProject, [
          this.org_id,
          this.project_owner,
          this.project_title,
          this.created_date,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByUserId(orgId, userId) {
    let getProjects = `select p.* from projects p 
    join project_members pm 
    on p.project_id = pm.project_id 
    where p.org_id = ? and pm.member_status = 1 AND (pm.user_id = ? OR p.project_owner = ?);`;
    return pool.execute(getProjects, [orgId, userId, userId]);
  }

  static updateProject(
    organizationID,
    projectOwnerID,
    description,
    projectTitle,
    projectID
  ) {
    let updatePro = `update projects set org_id = ?, project_owner = ?, description = ?, project_title = ? where project_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(updatePro, [
          organizationID,
          projectOwnerID,
          description,
          projectTitle,
          projectID,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteProject(owner_id, org_id, project_id) {
    let deletePro = `delete from projects where project_id = ? and org_id = ? and project_owner = ?`;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(deletePro, [
          project_id,
          org_id,
          owner_id,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByOrganizationID(org_id) {
    let getProjects = `select * from projects where org_id = ?`;
    return pool.execute(getProjects, [org_id]);
  }

  static findByProjectID(owner_id, org_id, project_id) {
    let getProjects = `select * from projects where project_id = ? and org_id = ? and project_owner = ?`;
    return pool.execute(getProjects, [project_id, org_id, owner_id]);
  }
}

module.exports = Project;
