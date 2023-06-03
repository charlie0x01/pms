require("dotenv").config();
const { pool, transaction } = require("../config/database");

class Task {
  constructor(
    task_title,
    created_date,
    due_date,
    description,
    priority,
    task_column_id
  ) {
    this.task_title = task_title;
    this.created_date = created_date;
    this.due_date = due_date;
    this.description = description;
    this.priority = priority;
    this.task_column_id = task_column_id;
  }

  save() {
    let addTask = `insert into tasks(task_title, created_date, due_date, description, priority, task_column_id) values(?, STR_TO_DATE(?, "%m/%d/%Y"), STR_TO_DATE(?, "%Y-%m-%d"), ?, ?, ?); `;
    return pool.execute(addTask, [
      this.task_title,
      this.created_date,
      this.due_date,
      this.description,
      this.priority,
      this.task_column_id,
    ]);
  }

  static updateTask(
    taskTitle,
    dueDate,
    description,
    priority,
    taskId,
    assigneeId
  ) {
    let updateTask = `update tasks set task_title = ?, due_date = ?, description = ?, priority = ? where task_id = ? `;
    let assignTask = `insert into task_assigned(asigned_task_id, asigned_user_id) values (?, ?);`;
    try {
      transaction(pool, async (connection) => {
        const _ = await connection.execute(updateTask, [
          taskTitle,
          dueDate,
          description,
          priority,
          taskId,
        ]);
        assigneeId.forEach((id) => {
          const __ = connection.execute(assignTask, [taskId, id]);
        });
        
      });
    } catch (error) {
      throw error;
    }
  }

  static deleteTask(taskId) {
    let deleteTask = `delete from tasks where task_id = ? `;
    return pool.execute(deleteTask, [taskId]);
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

  // Get Assignees of a Task
  static getAssigneesByTaskId(taskId) {
    let getAssignees = `select * from task_assigned where asigned_task_id = ?`;
    return pool.execute(getAssignees, [taskId]);
  }
}

module.exports = Task;
