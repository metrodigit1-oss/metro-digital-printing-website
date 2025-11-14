import { createItem, deleteItem, getCategories, getItem, getItems, updateItem } from '../controllers/item.controller.js';
import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ 
        message: 'Item route is working!' 
    });
});
router.post('/create', createItem);
router.get('/get', getItems);
router.delete('/delete/:id', deleteItem);
router.get('/get/:id', getItem);
router.post('/update/:id', updateItem);
router.get('/categories', getCategories);

export default router;