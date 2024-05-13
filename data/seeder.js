import pool from "./config.js";

//reset db file

async function seederDatabase() {
	try {
		//drop existing table if they exist
		await pool.query(
			`DROP TABLE IF EXISTS service CASCADE; 
        DROP TABLE IF EXISTS status CASCADE;
        DROP TABLE IF EXISTS user CASCADE;
        DROP TABLE IF EXISTS user_service CASCADE;`
		);
		//create service table
		await pool.query(
			`CREATE TABLE service 
      (id INT GENERATED AS IDENTITY PRIMARY KEY, 
        url VARCHAR(255), 
        name VARCHAR(255) NOT NULL)`
		);
		//create status table
		await pool.query(
			`CREATE TABLE status 
      ( id INT GENERATED AS IDENTITY PRIMARY KEY, 
        service_id INT REFERENCES service(id), 
        healthy BOOLEAN NOT NULL, 
        timestamp DATETIME)`
		);
		//create user table
		await pool.query(
			`CREATE TABLE user 
      (id INT GENERATED AS IDENTITY PRIMARY KEY,
         name VARCHAR(225))`
		);
		//create user_service table
		await pool.query(
			`CREATE TABLE user_service 
      (user_id REFERENCES user(id), 
      service_id REFERENCES service(id))`
		);
		//seed service table
		await pool.query(
			`INSERT INTO service (url, name) VALUES ('URL', 'netlify'), ('URL', 'twilio'), ('URL', 'auth0')`
		);
		//seed status table
		await pool.query(
			`INSERT INTO status (service_id, healthy, timestamp) VALUES (2, true, '2024-05-13 14:27:01')`
		);
		//seed user table
		await pool.query(`INSERT INTO user (name) VALUES ('sprintStars')`);
		//seed user_service table
		await pool.query(
			`INSERT INTO user_service (user_id, service_id) VALUES (1, 2)`
		);
		console.log("Database reset successful");
	} catch (error) {
		console.log("Database reset failed: ", error);
	} finally {
		//end the pool
		await pool.end();
	}
}

await seederDatabase();
