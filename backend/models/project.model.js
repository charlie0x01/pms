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
    let addProject = `insert into projects(project_org_id, project_owner, description, project_title, created_date, joining_code, status) values(?, ?, "", ?, STR_TO_DATE(?, "%m/%d/%Y"), ?, "Active"); `;
    let addBoard = `insert into boards(board_project_id) values(?);`;
    let addColumn = `insert into board_columns(column_board_id, column_title) values(?, "Completed");`;
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
        const board = await connection.execute(addBoard, [result[0].insertId]);

        // add default column
        const _ = await connection.execute(addColumn, [board[0].insertId]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByUserId(orgId, userId) {
    // let getProjects = `SELECT p.*, pm.member_status
    // FROM projects p
    // LEFT JOIN project_members pm ON p.project_id = pm.project_id
    // WHERE p.project_org_id = ?
    //   AND (pm.member_status = 1 OR p.project_owner = ?)
    //   AND (pm.project_member_id = ? OR p.project_owner = ? OR pm.project_member_id IS NULL);`;
    let getProjects = `select * from projects 
    where project_org_id = ? and (project_id in 
    (select project_id from project_members where project_member_id = ? and member_status = 1)
    or project_owner = ?);`;
    return pool.execute(getProjects, [orgId, userId, userId]);
  }

  static updateProject(description, projectTitle, projectId, status) {
    let updatePro = `update projects set description = ?, project_title = ?, status = ? where project_id = ? `;
    return pool.execute(updatePro, [
      description,
      projectTitle,
      status,
      projectId,
    ]);
  }

  static findByName(name) {
    let findbyname = `select * from projects where project_title = ?;`;
    return pool.execute(findbyname, [name]);
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

  static findByProjectId(projectId, memberId) {
    let getProject = `select p.*, b.board_id, pm.pm_role_id from projects p 
    left join boards b on b.board_project_id = p.project_id
    left join project_members pm on p.project_id = pm.project_id and pm.project_member_id = ?
    where p.project_id = ?;`;
    return pool.execute(getProject, [memberId, projectId]);
  }

  static findByProjectID(owner_id, org_id, project_id) {
    let getProjects = `select * from projects where project_id = ? and org_id = ? and project_owner = ?`;
    return pool.execute(getProjects, [project_id, org_id, owner_id]);
  }

  static findByboardID(boardId) {
    let getProjects = `select p.* from projects p
    join boards b on p.project_id = b.board_project_id
    where b.board_id = ?;`;
    return pool.execute(getProjects, [boardId]);
  }

  static findOwnerByID(projectId, ownerId) {
    let findOwner = `select * from projects where project_id = ? and project_owner = ?;`;
    return pool.execute(findOwner, [projectId, ownerId]);
  }

  static addMember(projectId, memberId) {
    let addMember = `insert into project_members(project_id, pm_role_id, project_member_id, member_status) values(?, 4, ?, 0);`;
    return pool.execute(addMember, [projectId, memberId]);
  }

  static isAlreadyMember(projectId, memberId) {
    let checkMember = `select * from project_members where project_id = ? and project_member_id = ?`;
    return pool.execute(checkMember, [projectId, memberId]);
  }

  static getMembers(projectId) {
    let getMembers = `select user.user_id, user.first_name, user.last_name, user.email, user.profile_picture, om.member_status, om.pm_role_id 
    from project_members as om join users as user on user.user_id = om.project_member_id where om.project_id = ? and member_status = 1;`;
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

  static changeMemberRole(projectId, memberId, roleId) {
    let changeMemberRole = `update project_members set pm_role_id = ? where project_id = ? and project_member_id = ?;`;
    return pool.execute(changeMemberRole, [roleId, projectId, memberId]);
  }

  static getActiveProjects(userId) {
    let getActiveProjects = `select distinct p.* from projects p
    left join project_members pm on p.project_id = pm.project_id
     where p.status = "Active" and (p.project_owner = ? or pm.project_member_id = ?);`;
    return pool.execute(getActiveProjects, [userId, userId]);
  }
}

module.exports = Project;
