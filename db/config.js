import { readFileSync } from "node:fs";
import pg from "pg";
import env from "@next/env";

const projectDir = process.cwd();
env.loadEnvConfig(projectDir, true);

const { Pool } = pg;

const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 6543,
  ssl: {
    ca: readFileSync("./supabase.crt"),
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("Connected to the database"));

export default pool;
