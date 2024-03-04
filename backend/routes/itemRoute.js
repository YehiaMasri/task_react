import express from "express";
import Item from "../models/item.js";

const router=express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;