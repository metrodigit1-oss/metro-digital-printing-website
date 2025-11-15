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
            // Find documents where the category field CONTAINS the category string
            filter.category = { $regex: category, $options: 'i' };
        }
        if (thickness && thickness !== 'all') {
            filter.thickness = { $regex: thickness, $options: 'i' };
        }
        if (side && side !== 'all') {
            filter.side = { $regex: side, $options: 'i' };
        }
        if (lamination && lamination !== 'all') {
            filter.lamination = { $regex: lamination, $options: 'i' };
        }
        if (size && size !== 'all') {
            filter.size = { $regex: size, $options: 'i' };
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

// --- HELPER FUNCTION FOR SPLITTING AND GETTING UNIQUE VALUES ---
/**
 * Fetches distinct values for a field, splits comma-separated strings,
 * and returns an array of unique, trimmed values.
 * @param {string} fieldName - The name of the model field.
 */
const getDistinctSplitValues = async (fieldName) => {
    // 1. Get all distinct values for the field (e.g., ['A', 'B', 'A,C'])
    const distinctValues = await Item.distinct(fieldName);

    // 2. Use flatMap to split comma-separated strings and flatten the array
    const allValues = distinctValues.flatMap(value =>
        typeof value === 'string'
            ? value.split(',').map(s => s.trim()).filter(Boolean) // Split, trim, and remove empty strings
            : [] // Ignore non-string values
    );

    // 3. Use a Set to get unique values, then convert back to an array
    const uniqueValues = [...new Set(allValues)];
    
    return uniqueValues;
};

// --- Get all unique categories (MODIFIED) ---
export const getCategories = async (req, res) => {
    try {
        const categories = await getDistinctSplitValues('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Get categories Error', error: error.message });
    }
}

// --- Get all unique thicknesses (MODIFIED) ---
export const getThicknesses = async (req, res) => {
    try {
        const thicknesses = await getDistinctSplitValues('thickness');
        res.status(200).json(thicknesses);
    } catch (error) {
        res.status(500).json({ message: 'Get thicknesses Error', error: error.message });
    }
}

// --- Get all unique sides (MODIFIED) ---
export const getSides = async (req, res) => {
    try {
        const sides = await getDistinctSplitValues('side');
        res.status(200).json(sides);
    } catch (error) {
        res.status(500).json({ message: 'Get sides Error', error: error.message });
    }
}

// --- Get all unique laminations (MODIFIED) ---
export const getLaminations = async (req, res) => {
    try {
        const laminations = await getDistinctSplitValues('lamination');
        res.status(200).json(laminations);
    }
    catch (error) {
        res.status(500).json({ message: 'Get laminations Error', error: error.message });
    }
}

// --- Get all unique sizes (MODIFIED) ---
export const getSizes = async (req, res) => {
    try {
        const sizes = await getDistinctSplitValues('size');
        res.status(200).json(sizes);
    }
    catch (error) {
        res.status(500).json({ message: 'Get sizes Error', error: error.message });
    }
}