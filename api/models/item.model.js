import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  itemid: { type: String, unique: true },

  name: { type: String, required: true,},

  category: { type: String, required: true },

  thickness: { type: String, required: true },
  
  side: { type: String, required: true },

  lamination: { type: String, required: true },

  size: { type: String, required: true },

  price: { type: Number, required: true },

  description: { type: String, required: true },

  imageUrl: { type: String, required: true },

}, { timestamps: true });

// Auto-generate itemid before saving
itemSchema.pre("save", async function(next) {
  if (!this.itemid) {
    const count = await Item.countDocuments();
    this.itemid = `item-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
