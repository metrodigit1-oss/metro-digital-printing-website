import { createItem, deleteItem, getItems } from '../controllers/item.controller.js';
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

export default router;