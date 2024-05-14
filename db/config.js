// import { readFileSync } from "node:fs";
import pg from "pg";
import env from "@next/env";

const projectDir = process.cwd();
env.loadEnvConfig(projectDir, true);

// const cert = readFileSync("./supabase.crt", "utf-8");
// console.log(cert)

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("connected to the database"));

export default pool;
