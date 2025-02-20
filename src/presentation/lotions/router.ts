import { Router } from "express";
import { ProductController } from "./productContoller";
import { ClienteController } from "./clienteController";
import { InventaryController} from "./inventarioController";

export class LotionRoutes {
    static get routes(): Router {
        const router = Router();

        const productController = new ProductController();
        
        router.get('/products', productController.getProducts);
        router.get('/products/:id', productController.getProductById);
        router.post('/products-create', productController.createProduct);

        const clientController = new ClienteController();
        router.post('/cliente-create', clientController.createClient);
        router.get('/client', clientController.getClient)

        const inventaryController = new InventaryController();

        

        return router;
    }
}
