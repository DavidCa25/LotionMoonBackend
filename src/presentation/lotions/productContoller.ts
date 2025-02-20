import { Request, Response } from "express";
import { ProductModel } from "../../data/models/producto.model";
import { InventoryModel } from "../../data/models/inventory.model";
import mongoose from "mongoose";

export class ProductController {
    
    public getProducts = async (req: Request, res: Response) => {
        try {
            const products = await ProductModel.find();
            res.json(products);
        } catch (error) {
            console.error(error);
        }
    }

    public getProductById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
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
            const [newProduct] = await ProductModel.create([{ productName, price, brand, descripcion }], { session });
    
            await InventoryModel.create(
                [{ stock: 0, minimunStock: 10, maximunStock: 25, product: newProduct._id }],
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
    };    
}
