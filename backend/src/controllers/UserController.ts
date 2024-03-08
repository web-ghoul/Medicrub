import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility/PasswordUtiility';
import { AuthPayload, DriverRegisterInput } from '../dto';
import { GenerateSignature } from '../utility/TokenUtility';
import { User, MedicurbLocation, Driver, License } from '../model';
import { DEFAULT_ERROR_MSG, NOT_EXIST_ERROR_MSG, EMAIL_EXIST_ERROR_MSG } from '../config';

/* -------------------------------------------------------------------------- */
/*                                 Get Profile                                */
/* -------------------------------------------------------------------------- */


export const GetProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userPayload = req.user as AuthPayload;

        if (userPayload) {
            const user = await User.findById(userPayload._id).populate('location');

            if (user) {
                return res.status(400).json({ data: user });
            }
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}