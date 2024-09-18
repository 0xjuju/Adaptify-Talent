
import { ClientSession } from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        dbSession?: ClientSession;
    }
}

