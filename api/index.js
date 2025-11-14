import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemRouter from './routes/item.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('API server is running on http://localhost:3000');
});

app.use('/api/item', itemRouter);
