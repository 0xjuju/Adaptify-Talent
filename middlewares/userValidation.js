
import { body, validationResult } from "express-validator";


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

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }

];



