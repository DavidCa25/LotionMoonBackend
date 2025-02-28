import { Request, Response } from "express";
import { InventoryModel } from "../../data/models/inventory.model";
import { ProductModel } from "../../data/models/producto.model";
import mongoose from "mongoose";
import { populate } from "dotenv";

export class InventaryController{
    public getInventory = async (req: Request, res: Response) => {
        try {
            const products = await InventoryModel.find().populate("product", "productName price");
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }

    
    public getInventoryById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            const inventory = await InventoryModel.findById(id).populate('product');
    
            if (!inventory) {
                res.status(404).json({ message: "Inventario no encontrado" });
                return;
            }
    
            res.status(200).json({ inventory });
        } catch (error) {
            console.error("Error al obtener inventario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };
    
    public createInventory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { stock, minimunStock, maximunStock, product } = req.body;
    
            if (!stock || !minimunStock || !maximunStock || !product) {
                res.status(400).json({ message: "Faltan campos requeridos" });
                return;
            }

            const newInventory = await InventoryModel.create({
                stock,
                minimunStock,
                maximunStock,
                product
            });
    
            res.status(201).json({ message: "Inventario creado", inventory: newInventory });
        } catch (error) {
            console.error("Error al crear inventario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };


    public updateInventory = async (req: Request, res: Response): Promise<void> => {
        const { idInventory } = req.params;
        const updateData = req.body;
    
        try {
            const updatedInventory = await InventoryModel.findByIdAndUpdate(idInventory, updateData, { new: true });
    
            if (!updatedInventory) {
                res.status(404).json({ message: "Inventario no encontrado" });
                return;
            }
    
            res.status(200).json({ message: "Inventario actualizado", inventory: updatedInventory });
        } catch (error) {
            console.error("Error al actualizar inventario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }; 

    public deleteInventory = async (req: Request, res: Response): Promise<void> => {
        const { idInventory } = req.params;
    
        try {
            const deletedInventory = await InventoryModel.findByIdAndDelete(idInventory);
    
            if (!deletedInventory) {
                res.status(404).json({ message: "Inventario no encontrado" });
                return;
            }
    
            res.status(200).json({ message: "Inventario eliminado" });
        } catch (error) {
            console.error("Error al eliminar inventario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };
}