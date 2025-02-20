import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    stock: {
        type: Number,
        required: true
    },
    minimunStock: {
        type: Number,
        required: true
    },
    maximunStock: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, {
    timestamps: true
});

export const InventoryModel = mongoose.model("Inventory", inventorySchema);
