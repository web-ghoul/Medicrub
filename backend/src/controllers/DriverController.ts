import { Request, Response, NextFunction } from 'express';
import { DriverPayload, DriverUpdateStatusInput, LocationInput } from '../dto';

import { Driver, License, MedicurbLocation } from '../model';
import { DEFAULT_ERROR_MSG, DRIVERS_SOCKET_CHANNEL, NOT_EXIST_ERROR_MSG } from '../config';
import { ExtractFiles } from '../middlewares/FilesExtractor';
import formidable from 'formidable';
import { UploadFile } from '../services/UploadService';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { getIO } from '../services/SockerIO';

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
                .select('-car')
                .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage phone email',
                })
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


/* -------------------------------------------------------------------------- */
/*                           Update Driver Position                           */
/* -------------------------------------------------------------------------- */
export const UpdateDriverPosition = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {
            const locationInputs = plainToClass(LocationInput, req.body);
            const errors = await validate(locationInputs);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            /* ------------------------------ Get Driver ----------------------------- */
            var driver = await Driver.findById(driverPayload.driverID)
                .select('user location visible onTrip')
                .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage',
                })
                .populate('location');

            /* ------------------------------ Driver Exist ------------------------------ */
            if (driver) {
                /* ----------------------------- Update Location ---------------------------- */
                if (driver.location != null) {
                    driver.location.latitude = locationInputs.latitude;
                    driver.location.longitude = locationInputs.longitude;
                    driver.location.address = locationInputs.address;
                    driver.location.coordinates = [
                        parseFloat(locationInputs.longitude),
                        parseFloat(locationInputs.latitude),
                    ];
                    
                    await driver.location.save();
                }
                /* ------------------------- Create New Location Obj ------------------------ */
                else {
                    const newLocation = await MedicurbLocation.create({
                        latitude: locationInputs.latitude,
                        longitude: locationInputs.longitude,
                        address: locationInputs.address,
                        coordinates: [
                            parseFloat(locationInputs.longitude),
                            parseFloat(locationInputs.latitude),
                        ],
                    });
                    driver.location = newLocation;
                    driver = await driver.save();
                }
                /* ------------------------------ Notify Admins ----------------------------- */
                getIO()
                    .of('/admin').emit(
                        DRIVERS_SOCKET_CHANNEL,
                        driver,
                    );
            }

            return res.status(201).json({ data: null });
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

/* -------------------------------------------------------------------------- */
/*                           Update Driver Status                           */
/* -------------------------------------------------------------------------- */
export const UpdateDriverStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {
            const statusInputs = plainToClass(DriverUpdateStatusInput, req.body);
            const errors = await validate(statusInputs);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            /* ------------------------------ Get Driver ----------------------------- */
            var driver = await Driver.findById(driverPayload.driverID)
                .select('user location visible onTrip')
                .populate({
                    path: 'user',
                    select: 'firstName lastName profileImage',
                })
                .populate('location');

            /* ------------------------------ Driver Exist ------------------------------ */
            if (driver) {
                driver.visible = statusInputs.isVisible;
                driver.onTrip = statusInputs.onTrip;
                driver = await driver.save();
                /* ------------------------------ Notify Admins ----------------------------- */
                getIO()
                    .of('/admin').emit(
                        DRIVERS_SOCKET_CHANNEL,
                        driver,
                    );
            }

            return res.status(201).json({ data: null });
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}
