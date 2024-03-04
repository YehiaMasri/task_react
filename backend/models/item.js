import { DataTypes } from "sequelize";
import sequelize from "../config/seq.js";

const Item = sequelize.define(
    "Item",
    {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "items",
        timestamps: false,
    }
);

export default Item;