require("dotenv").config();
const { pool, transaction } = require("../config/database");
const { v4: uuid } = require("uuid");

class Project {
  constructor(org_id, project_owner, project_title, created_date, description) {
    this.org_id = org_id;
    this.project_owner = project_owner;
    this.project_title = project_title;
    this.created_date = created_date;
    this.description = description;
  }

  save() {
    // generate joining code
    const joiningCode = uuid().slice(0, 8);
    let addProject = `insert into projects(project_org_id, project_owner, description, project_title, created_date, joining_code) values(?, ?, "", ?, ?, ?); `;
    let addBoard = `insert into boards(board_project_id) values(?);`;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addProject, [
          this.org_id,
          this.project_owner,
          this.project_title,
          this.created_date,
          joiningCode,
        ]);

        // add board for the project
        const _ = await connection.execute(addBoard, [result[0].insertId]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByUserId(orgId, userId) {
    let getProjects = `SELECT p.*, pm.member_status
    FROM projects p
    LEFT JOIN project_members pm ON p.project_id = pm.project_id
    WHERE p.project_org_id = ?
      AND (pm.member_status = 1 OR p.project_owner = ?)
      AND (pm.project_member_id = ? OR p.project_owner = ? OR pm.project_member_id IS NULL);`;
    return pool.execute(getProjects, [orgId, userId, userId, userId]);
  }

  static updateProject(description, projectTitle, projectId) {
    let updatePro = `update projects set description = ?, project_title = ? where project_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(updatePro, [
          description,
          projectTitle,
          projectId,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteProject(owner_id, project_id) {
    let deletePro = `delete from projects where project_id = ? and project_owner = ?`;
    let deleteMembers = `delete from project_members where project_id = ?;`;
    let deleteBoard = `delete from boards where board_project_id = ?;`;
    try {
      transaction(pool, async (connection) => {
        const _ = await connection.execute(deleteMembers, [project_id]);
        const __ = await connection.execute(deleteBoard, [project_id]);
        const result = await connection.execute(deletePro, [
          project_id,
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

  static findByProjectId(projectId) {
    let getProject = `select * from projects where project_id = ?`;
    return pool.execute(getProject, [projectId]);
  }

  static findByProjectID(owner_id, org_id, project_id) {
    let getProjects = `select * from projects where project_id = ? and org_id = ? and project_owner = ?`;
    return pool.execute(getProjects, [project_id, org_id, owner_id]);
  }

  static addMember(projectId, memberId) {
    let addMember = `insert into project_members(project_id, pm_role_id, project_member_id, member_status) values(?, 3, ?, 0);`;
    return pool.execute(addMember, [projectId, memberId]);
  }

  static isAlreadyMember(projectId, memberId) {
    let checkMember = `select * from project_members where project_id = ? and project_member_id = ?`;
    return pool.execute(checkMember, [projectId, memberId]);
  }

  static getMembers(projectId) {
    let getMembers = `select user.user_id, user.first_name, user.last_name, user.email, om.member_status from project_members as om join users as user on user.user_id = om.project_member_id where om.project_id = ? and member_status = 1;`;
    return pool.execute(getMembers, [projectId]);
  }

  static findByMemberAndProjectId(projectId, memberId) {
    let getOrganization = `select * from project_members where project_member_id = ? and project_id = ?;`;
    return pool.execute(getOrganization, [memberId, projectId]);
  }

  static checkMemberStatus(projectId, memberId) {
    try {
      let checkMemberStatus = `select from project_members where project_id = ? and project_member_id = ? and member_status = 1;`;
      return pool.execute(checkMemberStatus, [projectId, memberId]);
    } catch (error) {
      throw error;
    }
  }

  static joinProject(memberId) {
    try {
      let joinProject = `update project_members set member_status = 1 where project_member_id = ?`;
      return pool.execute(joinProject, [memberId]);
    } catch (error) {
      throw error;
    }
  }

  static findByJoiningCode(joiningCode) {
    let selectProject = `select * from projects where joining_code = ?`;
    return pool.execute(selectProject, [joiningCode]);
  }

  static findByMemberAndProjectId(projectId, memberId) {
    let getOrganization = `select * from project_members where project_member_id = ? and project_id = ?;`;
    return pool.execute(getOrganization, [memberId, projectId]);
  }

  static removeMember(projectId, memberId) {
    let removeMember = `delete from project_members where project_member_id = ? and project_id = ?`;
    return pool.execute(removeMember, [memberId, projectId]);
  }
}

module.exports = Project;
