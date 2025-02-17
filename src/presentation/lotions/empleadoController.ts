import { Request, Response } from 'express';
import DatabaseConnection from '../../databsase/DataBaseConnection';
import { Employee } from '../../data/models/empleado.model';

export const getEmpleados = async (_req: Request, res: Response) => {
  try {
    const db = await DatabaseConnection.getConnectedInstance();
    const empleadoRepo = db.getRepository(Employee);

    const empleados = await empleadoRepo.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error });
  }
};

export const createEmpleado = async (req: Request, res: Response) => {
  try {
    const db = await DatabaseConnection.getConnectedInstance();
    const empleadoRepo = db.getRepository(Employee);

    const nuevoEmpleado = empleadoRepo.create(req.body);
    const resultado = await empleadoRepo.save(nuevoEmpleado);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el empleado', error });
  }
};
