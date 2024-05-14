import pool from "../config.js";

const result = await pool.query("SELECT * FROM NOW()");
console.log(result.rows);
await pool.end();
