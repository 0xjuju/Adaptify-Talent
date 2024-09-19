
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


/**
 * Validate the name and email field of the user model
 *
 */

export const sanitizeAndValidateUser = [

    body("name")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Invalid name"),

    body("email")
        .escape()
        .trim()
        .isEmail()
        .withMessage("Please use a valid email"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }

];



