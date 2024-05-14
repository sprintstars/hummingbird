import db from "../config.js";
import SERVICE_SEED_DATA from "../seed/services.js";
import STATUS_HISTORY_SEED_DATA from "../seed/status_history.js";

const wait = (ms) =>
  new Promise((res, _) => {
    setTimeout(res, ms);
  });

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
  let sql = "";
  for (const table of tables) {
    sql += `DROP TABLE IF EXISTS ${table} CASCADE;\n`;
  }
  return db.query(sql);
};

const createTables = async () => {
  let sql = "";
  for (const [table, spec] of tableKeyValuePairs) {
    sql += `CREATE TABLE ${table} (${spec.columns
      .map((col) => `${col.name} ${col.constraints}`)
      .join(", ")});\n`;
  }
  return db.query(sql);
};

const seedData = async () => {
  for (const [table, spec] of tableKeyValuePairs) {
    let sql = "";
    let allValues = [];
    let count = 0;

    const columns = spec.columns
      .filter(({ name }) => name !== "id")
      .map(({ name }) => name);

    sql += `INSERT INTO ${table} (${columns.join(", ")}) VALUES `;

    for (const row of spec.seed) {
      const values = columns.map((col) => {
        const value = row[col];
        if (value === undefined) {
          throw new Error(
            `The schema for ${table}/${col} did not match a column specified in the seed data`
          );
        }
        return typeof value === "string" ? `'${value}'` : value;
      });

      allValues = allValues.concat(values);

      const colCount = columns.length;
      const subs = Array.from({ length: colCount }).map(
        (_, index) => `$${index + 1 + count}`
      );
      count += colCount;

      sql += `(${subs.join(", ")}),\n`;
    }
    sql = sql.substring(0, sql.length - 2) + ";\n";
    await db.query(sql, allValues);
  }
};

try {
  await destroyTables();
  console.log("Destroying tables...");
  await wait(100);
  console.log("Recreating tables...");
  await createTables();
  await wait(100);
  console.log("Seeding data...");
  await seedData();
} catch (e) {
  console.error(e);
} finally {
  await db.end();
}
