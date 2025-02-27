import { Request, Response } from "express";
import { ClienteModel } from "../../data/models/cliente.model";

export class ClienteController {
    public getClient = async (req: Request, res: Response) => {
        try {
            const products = await ClienteModel.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Clientes no encontrados" });
        }
    };

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
            res.status(500).json({ message: "Error en el servidor" });
        }
    };

    public createClient = async (req: Request, res: Response): Promise<void> => {
        const { clientName, email } = req.body;

        if (!clientName || !email) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
        try {
            const newCliente = await ClienteModel.create({ clientName, email });
            res.status(201).json(newCliente);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear cliente" });
        }
    };

    public updateClient = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedClient = await ClienteModel.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedClient) {
                res.json(updatedClient);
            } else {
                res.status(404).json({ message: "Cliente no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar cliente" });
        }
    };

    public deleteClient = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedClient = await ClienteModel.findByIdAndDelete(id);
            if (deletedClient) {
                res.json({ message: "Cliente eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Cliente no encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar cliente" });
        }
    };
}
