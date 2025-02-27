import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    contrasena: {
        type: String,
        required: true,
        maxlength: 50
    }
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);