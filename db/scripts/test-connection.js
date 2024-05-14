import pool from "../config.js";

const result = await pool.query("SELECT * FROM test");
console.log(result.rows);
