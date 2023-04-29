require("dotenv").config(".env");
const mysql = require("mysql2");

// connecting database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
});

async function trans(pool, callback) {
  const conn = await pool.getConnection();
  await conn.beginTransaction(); // start transaction

  try {
    await callback(conn);
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
}

// exporting pool
module.exports = { pool: pool.promise(), transaction: trans };