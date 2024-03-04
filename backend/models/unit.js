import { DataTypes } from "sequelize";
import sequelize from "../config/seq.js";

const Unit = sequelize.define(
    'Unit',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'units',
        timestamps: false
    }
);

export default Unit;