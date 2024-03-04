import express from "express";
import { Sequelize, Op } from "sequelize";
import Item from "../models/item.js";
import Unit from "../models/unit.js";

const router=express.Router();

// router.get('/all', async (req, res) => {
//     try {
//         const searchText = '';
//         const unitType = 'half_kilo';

//         // Query items with relations
//         const items = await Item.findAll({
//             where: {
//                 name: { [Op.like]: `%${searchText}%` }
//             },
//             include: [
//                 {
//                     association: 'units',
//                     where: { name: unitType }
//                 }
//             ]
//         });

//         res.json(items);
//     } catch (error) {
//         console.error('Error fetching items:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/all', async (req, res) => {
    const searchText = '';
        // const unitType = 'half_kilo';
    try {
        const items = await Item.findAll({
            where: { name: { [Sequelize.Op.like]: `%${searchText}%` } },
            include: [{
                model: Unit,
                as: 'units', // Specify the alias for the association
                // where: { name: unitType },
                through: { attributes: ['price'] } // Include additional attributes from the join table
            }]
        });
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;
