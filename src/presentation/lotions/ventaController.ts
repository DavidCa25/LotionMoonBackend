
import { Request, Response } from 'express';
import DatabaseConnection from '../../databsase/DataBaseConnection';
import { Sale } from '../../data/models/venta.model';

export const getVentas = async (_req: Request, res: Response) => {
    try {
      const db = await DatabaseConnection.getConnectedInstance();
      const ventaRepo = db.getRepository(Sale);
  
      const ventas = await ventaRepo.find();
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener ventas', error });
    }
  };
  
  export const createVenta = async (req: Request, res: Response) => {
    try {
      const db = await DatabaseConnection.getConnectedInstance();
      const ventaRepo = db.getRepository(Sale);
  
      const nuevaVenta = ventaRepo.create(req.body);
      const resultado = await ventaRepo.save(nuevaVenta);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la venta', error });
    }
  };
