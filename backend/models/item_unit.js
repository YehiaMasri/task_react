import  {Sequelize, DataTypes} from "sequelize";
import sequelize from "../config/seq.js";


const ItemUnit = sequelize.define('ItemUnit', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'item_unit',
    timestamps: false
});

export default ItemUnit;