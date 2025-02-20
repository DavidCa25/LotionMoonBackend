import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

export const ProductModel = mongoose.model("Product", productSchema);
