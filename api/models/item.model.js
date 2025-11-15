import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({

  name: { type: String, required: true,},

  category: { type: String, required: true },

  thickness: { type: String, required: true },
  
  side: { type: String, required: true },

  lamination: { type: String, required: true },

  size: { type: String, required: true },

  price: { type: Number, required: false },

  description: { type: String, required: true },

  imageUrl: { type: String, required: true },

}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
