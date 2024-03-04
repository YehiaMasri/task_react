import { Sequelize } from "sequelize";

const sequelize = new Sequelize("laravel", "newroot", "password", {
	host: "localhost",
	dialect: "mysql",
	define: {
		timestamps: false, 
	},
});
export default sequelize;
