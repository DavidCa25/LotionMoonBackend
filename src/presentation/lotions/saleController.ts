    import { Request, Response } from "express";
    import { SaleModel } from "../../data/models/sale.model";
    import { InventoryModel } from "../../data/models/inventory.model";
    import mongoose from "mongoose";

    export class SaleController {

        public getSales = async (req: Request, res: Response) => {
            try {
                const sales = await SaleModel.find()
                    .populate("clientID", "clientName") 
                    .populate("employeeID", "employeeName") 
                    .populate({
                        path: "products.inventoryID",
                        populate: {
                            path: "product",
                            select: "productName price"
                        }
                    });
        
                res.json(sales);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al obtener las ventas" });
            }
        };
        
        

        public createSale = async (req: Request, res: Response): Promise<void> => {
            const { products, totalPrice, clientID, employeeID } = req.body;
        
            if (!products || !Array.isArray(products) || products.length === 0 || !totalPrice || !clientID || !employeeID) {
                res.status(400).json({ message: "Faltan campos requeridos o los productos no tienen el formato correcto" });
                return;
            }
        
            const session = await mongoose.startSession();
            session.startTransaction();
        
            try {
                for (const product of products) {
                    const { inventoryID, quantity } = product;
        
                    const inventoryItem = await InventoryModel.findById(inventoryID).session(session);
                    if (!inventoryItem) {
                        throw new Error(`El producto en inventario ${inventoryID} no existe`);
                    }
        
                    if (inventoryItem.stock < quantity) {
                        throw new Error(`Stock insuficiente para el producto ${inventoryID}`);
                    }
        
                    inventoryItem.stock -= quantity;
                    await inventoryItem.save({ session });
                }
        
                const newSale = await SaleModel.create([{
                    total: totalPrice,
                    clientID,
                    employeeID,
                    products 
                }], { session });
        
                await session.commitTransaction();
                session.endSession();
        
                res.status(201).json({ message: "Venta creada exitosamente", sale: newSale });
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
        
                console.error(error);
                res.status(500).json({ message: error || "Error al crear la venta" });
            }
        };
        
        
        

        public updateSaleById = async (req: Request, res: Response): Promise<void> => {
            const { idSale } = req.params;
            const updateData = req.body;

            if (!idSale || Object.keys(updateData).length === 0) {
                res.status(400).json({ message: "Faltan campos requeridos o datos a actualizar" });
                return;
            }

            try {
                const updatedSale = await SaleModel.findByIdAndUpdate(idSale, { $set: updateData }, { new: true });

                if (!updatedSale) {
                    res.status(404).json({ message: "Venta no encontrada" });
                    return;
                }

                res.status(200).json({ message: "Venta actualizada", sale: updatedSale });
            } catch (error) {
                console.error("Error al actualizar venta:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        };

        public deleteSale = async (req: Request, res: Response): Promise<void> => {
            const { idSale } = req.params;
            try {
                const deletedSale = await SaleModel.findByIdAndDelete(idSale);

                if (!deletedSale) {
                    res.status(404).json({ message: "Venta no encontrada" });
                    return;
                }

                res.status(200).json({ message: "Venta eliminada", sale: deletedSale });
            } catch (error) {
                console.error("Error al eliminar venta:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }