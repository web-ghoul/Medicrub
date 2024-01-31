import { Request, Response, NextFunction } from 'express';
import { DriverPayload } from '../dto';

import { Driver, License } from '../model';
import { DEFAULT_ERROR_MSG, NOT_EXIST_ERROR_MSG } from '../config';
import { ExtractFiles } from '../middlewares/FilesExtractor';
import formidable from 'formidable';
import { UploadFile } from '../services/UploadService';

/* -------------------------------------------------------------------------- */
/*              Check Driver License , Car , Verification Status              */
/* -------------------------------------------------------------------------- */

export const CheckDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {
            const driver = await Driver.findById(driverPayload.driverID)
                .populate({
                    path: 'car',
                    model: 'Car',
                    populate: {
                        path: 'carAlbum',
                        model: 'CarAlbum',
                    },
                })
                .populate('driverLicense');

            if (driver) {
                const result = {
                    _id: driverPayload._id,                    
                    driverID: driverPayload.driverID,
                    verified: driver.verified,
                    hasCar: driver.car != null,
                    hasCarAlbum: driver.car?.carAlbum != null,
                    hasDriverLicense: driver.driverLicense != null,
                };
                return res.status(200).json({ data: result });
            }

        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}


/* -------------------------------------------------------------------------- */
/*                                 Get Driver                                 */
/* -------------------------------------------------------------------------- */

export const GetDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {
            const driver = await Driver.findById(driverPayload.driverID)
                .select('-car -user')
                .populate('location')
                .populate('driverLicense')
                .populate('nationalCard');

            if (driver) {
                return res.status(200).json({ data: driver });
            }

        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}



/* -------------------------------------------------------------------------- */
/*                             Add Driver License                             */
/* -------------------------------------------------------------------------- */



export const AddDriverLicense = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {

            const driver = await Driver.findById(driverPayload.driverID)
                .select('driverLicense')
                .populate('driverLicense');

            if (driver) {

                /* -------------------------- Extract License Data -------------------------- */
                const images = await ExtractFiles(req);
                const front = images['front'][0] as formidable.File;
                const back = images['back'][0] as formidable.File;

                if (front && back) {

                    /* -------------------------- Upload Files -------------------------- */
                    const frontURL = await UploadFile(front);
                    const backURL = await UploadFile(back);

                    /* -------------------------- Create License -------------------------- */
                    const license = await License.create({
                        front: frontURL,
                        back: backURL,
                        type: 'driver_license',
                    });

                    if (license) {
                        driver.driverLicense = license;
                        await driver.save();

                        return res.status(201).json({ data: license });
                    }
                }

            }

        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}
