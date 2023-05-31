require("dotenv").config();
const { pool, transaction } = require("../config/database");

class Kanban {
  constructor(column_board_id, column_title) {
    this.column_board_id = column_board_id;
    this.column_title = column_title;
  }

  save() {
    let addColumn = `insert into board_columns(column_board_id, column_title) values(?, 'Untitled'); `;
    try {
      console.log(this.column_board_id);
      transaction(pool, async (connection) => {
        const result = await connection.execute(addColumn, [
          this.column_board_id,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static updateColumn(columnTitle, columnId) {
    let updateColumn = `update board_columns set column_title = ? where column_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(updateColumn, [
          columnTitle,
          columnId,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteColumn(columnId) {
    let deleteColumn = `delete from board_columns where column_id = ? `;
    let deleteTasks = `delete from tasks where task_column_id = ?`;
    try {
      transaction(pool, async (connection) => {
        const tasks = await connection.execute(deleteTasks, [columnId]);
        const result = await connection.execute(deleteColumn, [columnId]);
      });
    } catch (error) {
      throw error;
    }
  }

  // Get one column
  static findByColumnId(columnId) {
    let getColumn = `select * from board_columns where column_id = ?`;
    return pool.execute(getColumn, [columnId]);
  }

  // Get all columns of a board
  static findByBoardId(boardId) {
    let getColumns = `select * from board_columns where column_board_id = ?`;
    return pool.execute(getColumns, [boardId]);
  }

  static checkMemberRole(memberId) {
    try {
      let checkMemberRole = `select * from project_members where project_member_id = ? and pm_role_id != 4;`;
      return pool.execute(checkMemberRole, [memberId]);
    } catch (error) {
      throw error;
    }
  }

  static checkProjectOnwer = (userId, boardId) => {
    let getBoard = `select * from boards b right join projects p on b.board_project_id = p.project_id where b.board_id = ? && p.project_owner = ?;`;
    return pool.execute(getBoard, [boardId, userId])
  }
}

module.exports = Kanban;
