import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

const pool = mysql.createPool({
	host: "localhost",
	user: "newroot",
	password: "password",
	database: "laravel",
});

(async () => {
	let connection;
	try {
		connection = await pool.getConnection();
		console.log("Connected to MySQL!");
	} catch (error) {
		console.error("Error connecting to MySQL:", error);
	}
})();

export default pool;
