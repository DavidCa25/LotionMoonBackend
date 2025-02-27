import { Router } from "express";
import { ProductController } from "./productContoller";
import { ClienteController } from "./clienteController";
import { InventaryController} from "./inventarioController";
import { EmployeeController } from "./employeeController";
import { PurchaseController } from "./purchaseController";
import { SaleController } from "./saleController";

export class LotionRoutes {
    static get routes(): Router {
        const router = Router();

        const productController = new ProductController();
        
        router.get('/products', productController.getProducts);
        router.post('/products-create', productController.createProduct);
        router.put('/products-update/:idProduct', productController.updateProductById);
        router.delete('/products-delete/:idProduct', productController.deleteProduct);

        const clientController = new ClienteController();
        router.post('/client-create', clientController.createClient);
        router.get('/client', clientController.getClient)
        router.put('/client-update/:idClient', clientController.updateClient);
        router.delete('/client-delete/:idClient', clientController.deleteClient);

        const inventaryController = new InventaryController();
        router.post('/inventory-create', inventaryController.createInventory);
        router.get('/inventory', inventaryController.getInventory);
        router.put('/inventory-update/:idInventory', inventaryController.updateInventory);
        router.delete('/inventory-delete/:idInventory', inventaryController.deleteInventory);

        const employeeController = new EmployeeController();
        router.get('/employees', employeeController.getEmployee);
        router.get('/employees/:id', employeeController.getEmployeeById);
        router.post('/employees-create', employeeController.createEmployee);
        router.put('/employees-update/:id', employeeController.updateEmployee);
        router.delete('/employees-delete/:id', employeeController.deleteEmployee);

        const purchaseController = new PurchaseController();
        router.post('/purchase-create', purchaseController.createPurchase);
        router.get('/purchase', purchaseController.getPurchases);
        router.put('/purchase-update/:idPurchase', purchaseController.updatePurchaseById);
        router.delete('/purchase-delete/:idPurchase', purchaseController.deletePurchase);

        const saleController = new SaleController();
        router.get('/sales', saleController.getSales);
        router.post('/sales-create', saleController.createSale);
        router.put('/sales-update/:idSale', saleController.updateSaleById);
        router.delete('/sales-delete/:idSale', saleController.deleteSale);

        return router;
    }
}
