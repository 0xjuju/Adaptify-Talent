
import mongoose from "mongoose";
import { Request, Response,  NextFunction } from "express";


const sessionMiddleware = async (req: Request, res: Response,  next: NextFunction) => {
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();
    req.dbSession = dbSession;

    res.on('finish', async () => {
        try {
            if (res.statusCode < 400) {
                await dbSession.commitTransaction();
            } else {
                await dbSession.abortTransaction();
            }
        } catch (err) {
            console.error('Error committing or aborting transaction:', err);
        } finally {
            await dbSession.endSession();
        }
    });

    next();
};

export default sessionMiddleware;