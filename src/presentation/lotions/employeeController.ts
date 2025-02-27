import { Request, Response } from "express";
import { EmployeeModel } from "../../data/models/employee.model";

export class EmployeeController {
    public getEmployee = async (req: Request, res: Response) => {
        try {
            const employees = await EmployeeModel.find();
            res.json(employees);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Empleados no encontrados" });
        }
    };

    public getEmployeeById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const employee = await EmployeeModel.findById(id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ message: "Empleado no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    };

    public createEmployee = async (req: Request, res: Response): Promise<void> => {
        const { employeeName, email, contrasena } = req.body;

        if (!employeeName || !email || !contrasena) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
        try {
            const newEmployee = await EmployeeModel.create({ employeeName, email, contrasena });
            res.status(201).json(newEmployee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear empleado" });
        }
    };

    public updateEmployee = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedEmployee) {
                res.json(updatedEmployee);
            } else {
                res.status(404).json({ message: "Empleado no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar empleado" });
        }
    };

    public deleteEmployee = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
            if (deletedEmployee) {
                res.json({ message: "Empleado eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Empleado no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar empleado" });
        }
    };
}