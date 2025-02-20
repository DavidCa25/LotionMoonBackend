import { Request, Response } from "express";
import { InventoryModel } from "../../data/models/inventory.model";
import { ProductModel } from "../../data/models/producto.model";
import mongoose from "mongoose";

export class InventaryController{
    public getClient = async (req: Request, res: Response) => {
        try {
            const products = await InventoryModel.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }

    
    public getClientById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await InventoryModel.findById(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Cliente no encontrado" });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    public createProduct = async (req: Request, res: Response): Promise<void> => {
        const { productName, price, brand, descripcion } = req.body;
    
        if (!productName || !price || !brand || !descripcion) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const newProduct = await ProductModel.create({ productName, price, brand, descripcion });
    
            await InventoryModel.create(
                {
                    stock: 0,
                    minimunStock: 10,
                    maximunStock: 25,
                    product: newProduct._id  
                },
                { session }
            );
    
            await session.commitTransaction();
            session.endSession();
    
            res.status(201).json(newProduct);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
    
            console.error(error);
            res.status(500).json({ message: "Error al crear un producto" });
        }
    }
}