import { Request, Response } from 'express';
import DatabaseConnection from '../../databsase/DataBaseConnection';
import { Purchase } from '../../data/models/compra.model';

export const getCompras = async (_req: Request, res: Response) => {
  try {
    const db = await DatabaseConnection.getConnectedInstance();
    const compraRepo = db.getRepository(Purchase);

    const compras = await compraRepo.find();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compras', error });
  }
};

export const createCompra = async (req: Request, res: Response) => {
  try {
    const db = await DatabaseConnection.getConnectedInstance();
    const compraRepo = db.getRepository(Purchase);

    const nuevaCompra = compraRepo.create(req.body);
    const resultado = await compraRepo.save(nuevaCompra);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la compra', error });
  }
};
