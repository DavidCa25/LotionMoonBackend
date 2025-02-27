import { Router } from "express";
import { ProductController } from "./productContoller";
import { ClienteController } from "./clienteController";
import { InventaryController} from "./inventarioController";

export class LotionRoutes {
    static get routes(): Router {
        const router = Router();

        const productController = new ProductController();
        
        router.get('/products', productController.getProducts);
        router.post('/products-create', productController.createProduct);
        router.put('/product-update/:idProduct', productController.updateProductById);
        router.delete('/product-delete/:idProduct', productController.deleteProduct);

        const clientController = new ClienteController();
        router.post('/cliente-create', clientController.createClient);
        router.get('/client', clientController.getClient)
        router.put('/client-update/:idClient', clientController.updateClient);
        router.delete('/client-delete/:idClient', clientController.deleteClient);

        const inventaryController = new InventaryController();
        router.post('/inventory-create', inventaryController.createInventory);
        router.get('/inventory', inventaryController.getClient);
        router.put('/inventory-update/:idInventory', inventaryController.updateInventory);
        router.delete('/inventory-delete/:idInventory', inventaryController.updateInventory);

        

        return router;
    }
}
