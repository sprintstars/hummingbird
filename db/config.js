import { readFileSync } from "node:fs";
import pg from "pg";
import env from "@next/env";

const projectDir = process.cwd();
env.loadEnvConfig(projectDir, true);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    ca: readFileSync("./supabase.crt"),
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("Connected to the database"));

export default pool;
