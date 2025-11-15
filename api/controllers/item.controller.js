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
        // --- 1. GET NEW QUERY PARAMETERS ---
        const searchTerm = req.query.searchTerm || '';
        const category = req.query.category;
        const thickness = req.query.thickness; // new
        const side = req.query.side;           // new
        const lamination = req.query.lamination; // new
        const size = req.query.size;           // new
        
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;
        const limit = parseInt(req.query.limit) || 0; // Keep limit for home page

        let filter = {};

        if (searchTerm) {
            filter.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        // --- 2. ADD NEW FIELDS TO THE FILTER OBJECT ---
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (thickness && thickness !== 'all') {
            filter.thickness = thickness;
        }
        if (side && side !== 'all') {
            filter.side = side;
        }
        if (lamination && lamination !== 'all') {
            filter.lamination = lamination;
        }
        if (size && size !== 'all') {
            filter.size = size;
        }
        
        const sortOptions = {};
        sortOptions[sort] = order;

        // Find items based on filter, sort, and limit
        const items = await Item.find(filter).sort(sortOptions).limit(limit);

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

// --- Get all unique categories ---
export const getCategories = async (req, res) => {
    try {
        const categories = await Item.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Get categories Error', error: error.message });
    }
}

// --- Get all unique thicknesses ---
export const getThicknesses = async (req, res) => {
    try {
        const thicknesses = await Item.distinct('thickness');
        res.status(200).json(thicknesses);
    } catch (error) {
        res.status(500).json({ message: 'Get thicknesses Error', error: error.message });
    }
}

// --- Get all unique sides ---
export const getSides = async (req, res) => {
    try {
        const sides = await Item.distinct('side');
        res.status(200).json(sides);
    } catch (error) {
        res.status(500).json({ message: 'Get sides Error', error: error.message });
    }
}

// --- Get all unique laminations ---
export const getLaminations = async (req, res) => {
    try {
        const laminations = await Item.distinct('lamination');
        res.status(200).json(laminations);
    }
    catch (error) {
        res.status(500).json({ message: 'Get laminations Error', error: error.message });
    }
}

// --- Get all unique sizes ---
export const getSizes = async (req, res) => {
    try {
        const sizes = await Item.distinct('size');
        res.status(200).json(sizes);
    } catch (error) {
        res.status(500).json({ message: 'Get sizes Error', error: error.message });
    }
}