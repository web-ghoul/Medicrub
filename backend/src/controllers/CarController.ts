import { Request, Response, NextFunction } from 'express';
import { CreateCarInput, DriverPayload } from '../dto';

import { Car, CarAlbum, Driver, License } from '../model';
import { DEFAULT_ERROR_MSG, NOT_EXIST_ERROR_MSG } from '../config';
import { ExtractFiles, ExtractForm } from '../middlewares/FilesExtractor';
import formidable from 'formidable';
import { UploadFile } from '../services/UploadService';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/* -------------------------------------------------------------------------- */
/*                               Create New Car                               */
/* -------------------------------------------------------------------------- */

export const CreateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {

            /* ----------------------------- Validate Inputs ---------------------------- */
            const [fields, images] = await ExtractForm(req);
            const registration = images['registration'][0] as formidable.File;
            const insurance = images['insurance'][0] as formidable.File;

            const carInputs = plainToClass(CreateCarInput, fields);
            const errors = await validate(carInputs);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const driver = await Driver.findById(driverPayload.driverID).select('car');
            if (driver) {
                const registrationURL = await UploadFile(registration);
                const insuranceURL = await UploadFile(insurance);

                const car = await Car.create({
                    driver: driver._id,
                    registration: registrationURL,
                    insurance: insuranceURL,

                    carType: carInputs.carType,
                    carModel: carInputs.carModel,
                    plateNum: carInputs.plateNum,
                    color: carInputs.color,
                });


                if (car) {
                    driver.car = car;
                    await driver.save();
                    return res.status(201).json({ data: car });
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
/*                                Add Car Album                               */
/* -------------------------------------------------------------------------- */

export const AddCarAlbum = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {

            /* ----------------------------- Validate Inputs ---------------------------- */
            const images = await ExtractFiles(req);

            const front = images['front'][0] as formidable.File;
            const back = images['back'][0] as formidable.File;
            const right = images['right'][0] as formidable.File;
            const left = images['left'][0] as formidable.File;

            const car = await Car.findOne({ driver: driverPayload.driverID });


            if (car) {
                const frontURL = await UploadFile(front);
                const backURL = await UploadFile(back);
                const rightURL = await UploadFile(right);
                const leftURL = await UploadFile(left);

                const carAlbum = await CarAlbum.create({
                    car: car,
                    front: frontURL,
                    back: backURL,
                    right: rightURL,
                    left: leftURL,
                });

                if(carAlbum){
                    car.carAlbum = carAlbum;
                    await car.save();
                    return res.status(201).json({ data: carAlbum });
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
/*                                 Get My Car                                 */
/* -------------------------------------------------------------------------- */


export const GetMyCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const driverPayload = req.user as DriverPayload;

        if (driverPayload) {
                const car = await Car.findOne({ driver: driverPayload.driverID }).populate('carAlbum').populate('carAlbum');


            if (car) {
                return res.status(200).json({ data: car });            
            }
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });

    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}