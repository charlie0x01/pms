require("dotenv").config();
const { pool, transaction } = require("../config/database");

class Task {
  constructor(
    task_title,
    start_date,
    end_date,
    description,
    status,
    priority_tag,
    task_column_id
  ) {
    this.task_title = task_title;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
    this.status = status;
    this.priority_tag = priority_tag;
    this.task_column_id = task_column_id;
  }

  save(assignedUserId) {
    let addTask = `insert into tasks(task_title, start_date, end_date, description, status, priority_tag, task_column_id) values(?, ?, ?, ?, ?, ?, ?); `;
    let addAssignee = `insert into task_assigned(asigned_task_id, asigned_user_id) values(?, ?);`;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(addTask, [
          this.task_title,
          this.start_date,
          this.end_date,
          this.description,
          this.status,
          this.priority_tag,
          this.task_column_id,
        ]);

        // add board for the project
        const _ = await connection.execute(addAssignee, [
          result[0].insertId,
          assignedUserId,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static updateTask(
    taskTitle,
    endDate,
    description,
    status,
    priorityTag,
    taskId
  ) {
    let updateTask = `update tasks set task_title = ?, end_date = ?, description = ?, status = ?, priority_tag = ? where task_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(updateTask, [
          taskTitle,
          endDate,
          description,
          status,
          priorityTag,
          taskId,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteTask(taskId) {
    let deleteTask = `delete from tasks where task_id = ? `;
    try {
      transaction(pool, async (connection) => {
        const tasks = await connection.execute(deleteTask, [taskId]);
      });
    } catch (error) {
      throw error;
    }
  }

  // Get One Task
  static findByTaskId(taskId) {
    let getTask = `select * from tasks where task_id = ?`;
    return pool.execute(getTask, [taskId]);
  }

  // Get all Tasks of a Column
  static findByColumnId(columnId) {
    let getTasks = `select * from tasks where task_column_id = ?`;
    return pool.execute(getTasks, [columnId]);
  }
}

module.exports = Task;
