import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    creationPurchase: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: true,
        maxlength: 50
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeID",
        required: true
    },
    products: [  
        {
            inventoryID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Inventory",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

export const PurchaseModel = mongoose.model("Purchase", purchaseSchema);