import pool from "../config.js";
import SERVICE_SEED_DATA from "../seed/services.js";
import STATUS_HISTORY_SEED_DATA from "../seed/status_history.js";

const schema = {
  services: {
    columns: [
      { name: "id", constraints: "serial PRIMARY KEY" },
      { name: "name", constraints: "varchar(50)" },
      { name: "url", constraints: "text" },
      { name: "strategy", constraints: "varchar(16)" },
    ],
    seed: SERVICE_SEED_DATA,
  },
  status_history: {
    columns: [
      { name: "id", constraints: "serial PRIMARY KEY" },
      { name: "service_id", constraints: "integer REFERENCES services(id)" },
      { name: "healthy", constraints: "boolean" },
      { name: "time", constraints: "timestamp DEFAULT CURRENT_TIMESTAMP" },
    ],
    seed: STATUS_HISTORY_SEED_DATA,
  },
};

const tables = Object.keys(schema);
const tableKeyValuePairs = Object.entries(schema);

const destroyTables = async () => {
  try {
    let sql = "";
    for (const table of tables) {
      sql += `DROP TABLE IF EXISTS ${table} CASCADE;\n`;
    }
    pool.query(sql);
  } catch (e) {
    console.log("Error destroying tables");
    console.error(e);
  }
};

const createTables = async () => {
  try {
    let sql = "";
    for (const [table, spec] of tableKeyValuePairs) {
      sql += `CREATE TABLE ${table} (${spec.columns
        .map((col) => `${col.name} ${col.constraints}`)
        .join(", ")});\n`;
    }
    // console.log(sql);
    pool.query(sql);
  } catch (e) {
    console.log("Error creating tables");
    console.error(e);
  }
};

const seedData = async () => {
  try {
    let sql = "";
    for (const [table, spec] of tableKeyValuePairs) {
      for (const row of spec.seed) {
        sql += `INSERT INTO ${table} (${spec.columns
          .map((col) => col.name)
          .join(", ")}) VALUES (${Object.keys(row).map(
          (_, index) => `$${index + 1}`
        )});\n`;
      }
    }
    console.log(sql);
    pool.query(sql);
  } catch (e) {
    console.log("Error seeding data");
    console.error(e);
  }
};

const resetDatabase = async () => {
  try {
    await destroyTables();
    await createTables();
    await seedData();
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
};

await resetDatabase();
