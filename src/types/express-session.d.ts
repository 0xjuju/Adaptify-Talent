
import { ClientSession } from "mongoose";


/**
 * Create separate custom db session for database
 */
declare module "express-serve-static-core" {
    interface Request {
        dbSession?: ClientSession;
    }
}

