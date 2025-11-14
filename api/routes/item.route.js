import { createItem } from '../controllers/item.controller.js';
import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ 
        message: 'Item route is working!' 
    });
});
router.post('/create', createItem);

export default router;