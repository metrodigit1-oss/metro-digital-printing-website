import Item from "../models/item.model.js";

// --- Create a new item ---
export const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(500).json({ message: 'Create item Error', error: error.message });
    }
}

// --- Get all items ---
export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Get items Error', error: error.message });
    }
}

// --- Delete an item ---
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found!' });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item has been deleted!' });

    } catch (error) {
        res.status(500).json({ message: 'Delete item Error', error: error.message });
    }
}

// --- Get a single item ---
export const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found!' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Get item Error', error: error.message });
    }
}

// --- Update an item ---
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found!' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update only the fields provided
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Update item Error', error: error.message });
    }
}