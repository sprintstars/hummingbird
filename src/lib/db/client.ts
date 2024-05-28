import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    ca: process.env.SUPABASE_CERT,
  },
});

pool.on("error", (err) => console.error(err));
pool.on("connect", () => console.log("connected to the database"));

export default pool;
