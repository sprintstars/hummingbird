import pool from "./config.js";
import SERVICE from "./service.js";
import STATUS from "./status.js";
import USERSERVICE from "./user_service.js";
import USER from "./user.js";

//reset db file

async function seederDatabase() {
	try {
		//drop existing table if they exist
		await pool.query(
			`DROP TABLE IF EXISTS user_service CASCADE;
	   DROP TABLE IF EXISTS user CASCADE;
	   DROP TABLE IF EXISTS status CASCADE;
	   DROP TABLE IF EXISTS service CASCADE;`
		);

		// Create service table
		await pool.query(
			`CREATE TABLE service (
		service_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		url VARCHAR(255)NOT NULL, 
		name VARCHAR(255) NOT NULL,
			)`
		);

		// Create status table
		await pool.query(
			`CREATE TABLE status (
		status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    service_id INT REFERENCES service(id),
		healthy BOOLEAN NOT NULL, 
		timestamp TIMESTAMP NOT NULL,
			)`
		);

		// Create user table
		await pool.query(
			`CREATE TABLE "user" (
				user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
				name VARCHAR(255) NOT NULL
			)`
		);

		// Create user_service table
		await pool.query(
			`CREATE TABLE user_service (
				user_id INT REFERENCES "user"(id), 
				service_id INT REFERENCES service(id)
			)`
		);

		// Seed service table
		for (const service of SERVICE) {
			await pool.query(`INSERT INTO service (name, url) VALUES ($1, $2),`);
			[service.name, service.URL];

			// Seed status table
			await pool.query(
				`INSERT INTO status (service_id, healthy, timestamp) 
			 VALUES (2, true, NOW())`
			);

			// Seed user table
			await pool.query(`INSERT INTO 'user' (name) VALUES ('sprintStars')`);

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
