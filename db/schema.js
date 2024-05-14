import SERVICE_SEED_DATA from "./seed/services.js";
import STATUS_HISTORY_SEED_DATA from "./seed/status_history.js";

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
const tableSpecPairs = Object.entries(schema);

export {
  schema,
  tables,
  tableSpecPairs
}
