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
      { name: "service_id", constraints: "integer FOREIGN KEY" },
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
    pool.query(sql);
  } catch (e) {
    console.error(e);
  }
};

const seedData = async () => {
  try {
    let sql = "";
    for (const [table, spec] of tableKeyValuePairs) {
      sql += `INSERT INTO ${table} (${spec.columns
        .map((col) => col.name)
        .join(", ")}) VALUES (${spec.seed});\n`;
    }
    pool.query(sql);
  } catch (e) {
    console.error(e);
  }
};

//reset db file
async function seederDatabase() {
  try {
    // Drop existing table if they exist
    await pool.query(
      `DROP TABLE IF EXISTS user_service CASCADE;
			DROP TABLE IF EXISTS users CASCADE;
			DROP TABLE IF EXISTS status CASCADE;
			DROP TABLE IF EXISTS service CASCADE;`
    );

    // Create service table
    await pool.query(
      `CREATE TABLE service (
				id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
				url VARCHAR(255) NOT NULL, 
				name VARCHAR(255) NOT NULL
			)`
    );

    // Create status table
    await pool.query(
      `CREATE TABLE status (
				status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
				service_id INT REFERENCES service(id),
				healthy BOOLEAN NOT NULL, 
				timestamp TIMESTAMP NOT NULL
			)`
    );

    // Create user table
    await pool.query(
      `CREATE TABLE users (
				id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
				name VARCHAR(255) NOT NULL
			)`
    );

    // Create user_service table
    await pool.query(
      `CREATE TABLE user_service (
				user_id INT REFERENCES users(id), 
				service_id INT REFERENCES service(id)
			)`
    );

    // Seed service table
    for (const service of SERVICE) {
      await pool.query(`INSERT INTO service (name, url) VALUES ($1, $2)`, [
        service.name,
        service.URL,
      ]);

      // Seed status table
      await pool.query(
        `INSERT INTO status (service_id, healthy, timestamp) 
				VALUES (2, true, NOW())`
      );

      // Seed user table
      await pool.query(`INSERT INTO users (name) VALUES ('sprintStars')`);

      // Seed user_service table
      await pool.query(
        `INSERT INTO user_service (user_id, service_id) VALUES (1, 2)`
      );
    }

    console.log("Database reset successful");
  } catch (error) {
    console.log("Database reset failed: ", error);
  } finally {
    //end the pool
    await pool.end();
  }
}

await seederDatabase();
