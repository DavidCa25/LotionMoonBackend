import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    }

});

export const ClienteModel = mongoose.model("Cliente", clienteSchema);
