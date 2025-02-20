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
    
    public createClient = async (req: Request, res: Response): Promise<void> => {
        const { clientName, email } = req.body;

        if(!clientName || !email) {
            res.status(400).json({message: "faltan campos requeridos"});
            return
        }
        try {
            const newCliente = await ClienteModel.create({ clientName, email });
        } catch (error) {
            console.error(error);
        }
    }; 
}