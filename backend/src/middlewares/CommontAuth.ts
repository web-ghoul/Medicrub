import { Request, Response, NextFunction } from "express";

import { ValidateSignature } from "../utility/TokenUtility";
import { AuthPayload } from "../dto";



export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validSignature = ValidateSignature(req);

    if (validSignature) {
        return next();
    }

    return res.status(400).json({ message: "Authorization Failed" });
} 