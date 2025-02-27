import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    clientID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cliente", 
        required: true 
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Employee", 
        required: true
    },
    inventoryID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Inventory", 
        required: true
    }
});

export const SaleModel = mongoose.model("Sale", saleSchema);