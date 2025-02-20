import { Router } from "express";
import { LotionRoutes } from "./lotions/router";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/api/lotions", LotionRoutes.routes);
        return router;
    }
}
