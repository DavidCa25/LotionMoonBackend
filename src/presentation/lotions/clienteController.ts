import { Request, Response } from "express";
import { ClienteModel } from "../../data/models/cliente.model";

export class ClienteController{
    public getClient = async (req: Request, res: Response) => {
        try {
            const products = await ClienteModel.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }

    
    public getClientById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await ClienteModel.findById(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Cliente no encontrado" });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    public createClient = async (req: Request, res: Response) => {
        try {
            const { clientName, email } = req.body;
            const newCliente = await ClienteModel.create({ clientName, email });
            return res.status(201).json(newCliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear el cliente" });
        }
    }; 
}