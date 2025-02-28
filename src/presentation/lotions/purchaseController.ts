import { Request, Response } from "express";
import { PurchaseModel } from "../../data/models/purchase.model";
import { InventoryModel } from "../../data/models/inventory.model";
import mongoose from "mongoose";

export class PurchaseController {

    public getPurchases = async (req: Request, res: Response) => {
        try {
            const purchases = await PurchaseModel.find().populate({
                path: "products.inventoryID",
                populate: {
                    path: "product",
                    select: "productName"
                }
            });
            res.json(purchases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener las compras" });
        }
    }

    public createPurchase = async (req: Request, res: Response): Promise<void> => {
        const { products, total, provider, employeeID } = req.body;
    
        if (!Array.isArray(products) || products.length === 0) {
            res.status(400).json({ message: "Se requiere al menos un producto" });
            return;
        }
    
        if (products.length > 1) {
            res.status(400).json({ message: "Solo se puede agregar un producto por compra" });
            return;
        }
    
        if (!total || !provider || !employeeID) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const newPurchase = await PurchaseModel.create([{
                products, 
                total, 
                provider, 
                employeeID 
            }], { session });
    
            const { inventoryID, quantity } = products[0];
    
            const productInventory = await InventoryModel.findById(inventoryID).session(session);
            if (productInventory) {
                productInventory.stock += quantity; 
                await productInventory.save({ session });
            }
    
            await session.commitTransaction();
            session.endSession();
    
            res.status(201).json(newPurchase);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
    
            console.error(error);
            res.status(500).json({ message: "Error al crear la compra" });
        }
    };
    
    

    public updatePurchaseById = async (req: Request, res: Response): Promise<void> => {
        const { idPurchase } = req.params;
        const updateData = req.body;

        if (!idPurchase || Object.keys(updateData).length === 0) {
            res.status(400).json({ message: "Faltan campos requeridos o datos a actualizar" });
            return;
        }

        try {
            const updatedPurchase = await PurchaseModel.findByIdAndUpdate(idPurchase, { $set: updateData }, { new: true });

            if (!updatedPurchase) {
                res.status(404).json({ message: "Compra no encontrada" });
                return;
            }

            res.status(200).json({ message: "Compra actualizada", purchase: updatedPurchase });
        } catch (error) {
            console.error("Error al actualizar compra:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    public deletePurchase = async (req: Request, res: Response): Promise<void> => {
        const { idPurchase } = req.params;
        try {
            const deletedPurchase = await PurchaseModel.findByIdAndDelete(idPurchase);

            if (!deletedPurchase) {
                res.status(404).json({ message: "Compra no encontrada" });
                return;
            }

            res.status(200).json({ message: "Compra eliminada", purchase: deletedPurchase });
        } catch (error) {
            console.error("Error al eliminar compra:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}