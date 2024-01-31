import jwt from 'jsonwebtoken';

import { Request } from 'express';
import { AuthPayload } from '../dto';


export const GenerateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '30d' });
}


export const ValidateSignature = (req: Request) => {
    const token = req.get('Authorization');

    if (token) {
        try {
            const payload = jwt.verify(token.split(' ')[1], process.env.JWT_KEY!) as AuthPayload;
            req.user = payload;
            return true;
        } catch (_) {
            return false;
        }

    }

    return false;
}