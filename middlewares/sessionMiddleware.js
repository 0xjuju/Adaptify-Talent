
import mongoose from "mongoose";

const sessionMiddleware = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    req.session = session;

    res.on('finish', async () => {
        try {
            if (res.statusCode < 400) {
                await session.commitTransaction();
            } else {
                await session.abortTransaction();
            }
        } catch (err) {
            console.error('Error committing or aborting transaction:', err);
        } finally {
            await session.endSession();
        }
    });

    next();
};

export default sessionMiddleware;