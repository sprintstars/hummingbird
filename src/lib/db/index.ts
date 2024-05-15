import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 6543,
  ssl: {
    ca: readFileSync(resolve("cert/supabase.crt")),
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("connected to the database"));

export default pool;
