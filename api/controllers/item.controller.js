import Item from "../models/item.model.js";

export const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(500).json({ message: 'Create item Error', error: error.message });
    }
}