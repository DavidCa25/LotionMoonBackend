import { Request, Response } from "express";
import { ProductModel } from "../../data/models/producto.model";

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

    public createProduct = async (req: Request, res: Response) => {
        try {
            const { productName, price, brand, descripcion } = req.body;
            const newProduct = await ProductModel.create({ productName, price, brand, descripcion });
            return res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear un producto" });
        }
    };      
}
