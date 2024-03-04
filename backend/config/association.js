import Item from "../models/item.js";
import Unit from "../models/unit.js";
import ItemUnit from "../models/item_unit.js";

Item.belongsToMany(Unit, {
	through: "item_unit",
	foreignKey: "item_id",
    as:'units',
	timestamps: false,
    through: {
        model: ItemUnit,
        attributes: ['price'] // Include the price attribute from the item_unit table
    }
});
Unit.belongsToMany(Item, {
	through: "item_unit",
	foreignKey: "unit_id",
    as: 'items',
	timestamps: false,
    through: {
        model: ItemUnit,
        attributes: ['price'] // Include the price attribute from the item_unit table
    }
});
