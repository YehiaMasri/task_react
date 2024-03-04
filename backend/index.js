import express from "express";
import cros from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import "./config/association.js";
import itemRoute from "./routes/itemRoute.js";
import allItem from "./routes/allItem.js";
import pool from './config/connect.js';

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = new express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cros());
app.get("/", (req, res) => {
	res.send("API is running...");
});

app.use("/item", itemRoute);
app.use("/items", allItem); 

app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`
	)
);


