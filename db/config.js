import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";
import env from "@next/env";

const projectDir = process.cwd();
env.loadEnvConfig(projectDir, true);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    ca: readFileSync(resolve("cert/supabase.crt")),
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("Connected to the database"));

export default pool;
