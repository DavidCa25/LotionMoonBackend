import express from "express";
import { envs } from "./config/env";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/router";


console.log(`Starting server on PORT: ${envs.PORT}`);

const app = express();
const cors = require('cors');
app.use(cors({ 
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  }));
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    try {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); 
    }
})();

app.listen(envs.PORT, async () => {
    console.log(`Server running on PORT ${envs.PORT}`);
});