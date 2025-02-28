import * as env from 'env-var';
import 'dotenv/config'; 

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MONGO_URL: env.get("MONGO_URL").required().asString(),
    MONGO_DB: env.get("MONGO_DB").required().asString()
};
