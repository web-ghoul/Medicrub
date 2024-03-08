
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate as classValidator } from 'class-validator';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility/PasswordUtiility';
import { AuthPayload, DriverRegisterInput, LoginInput } from '../dto';
import { GenerateSignature } from '../utility/TokenUtility';
import { User, MedicurbLocation, Driver, License } from '../model';
import { NOT_EXIST_ERROR_MSG, DEFAULT_ERROR_MSG, EMAIL_EXIST_ERROR_MSG, LOGIN_FAILED_ERROR_MSG, DRIVER } from '../config';
import { UploadFile } from '../services/UploadService';
import { ExtractFiles, ExtractForm } from '../middlewares/FilesExtractor';
import formidable from 'formidable';




/* -------------------------------------------------------------------------- */
/*                               Driver Register                              */
/* -------------------------------------------------------------------------- */
export const DriverRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const [fields, images] = await ExtractForm(req);

        /* ------------------------------ Check Inputs ------------------------------ */
        const driverInputs = plainToClass(DriverRegisterInput, fields);
        const errors = await classValidator(driverInputs);


        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const profile = images['profile'][0] as formidable.File;
        const nationalFront = images['nationalFront'][0] as formidable.File;
        const nationalBack = images['nationalBack'][0] as formidable.File;

        if (profile && nationalFront && nationalBack) {


            /* ----------------------- Check If User Already Exist ---------------------- */
            const existUser = await User.findOne({ "email": driverInputs.email.replace(/ /g, "") });
            if (existUser) {
                return res.status(400).json({ message: EMAIL_EXIST_ERROR_MSG });
            }

            /* ------------------------------ Upload Media ------------------------------ */

            const prifileURL = await UploadFile(profile);
            const nationalFrontURL = await UploadFile(nationalFront);
            const nationalBackURL = await UploadFile(nationalBack);



            /* ------------------------------ Hash Password ----------------------------- */
            const salt = await GenerateSalt();
            const hashedPassword = await GeneratePassword(driverInputs.password, salt);

            /* --------------------------- Create New Location -------------------------- */
            const userLocation = await MedicurbLocation.create({
                latitude: driverInputs.latitude,
                longitude: driverInputs.longitude,
                address: driverInputs.address,
                coordinates: [
                    parseFloat(driverInputs.longitude),
                    parseFloat(driverInputs.latitude),
                ],
            });

            /* --------------------------- Create New User --------------------------- */
            const user = await User.create({
                firstName: driverInputs.firstName,
                lastName: driverInputs.lastName,
                birthDate: driverInputs.birthDate,
                type: DRIVER,
                profileImage: prifileURL,


                phone: driverInputs.phone.replace(/ /g, ""),
                email: driverInputs.email.replace(/ /g, ""),
                ssn: driverInputs.ssn,
                medicalInsurance: driverInputs.medicalInsurance,

                phoneVerified: false,
                emailVerified: false,

                salt: salt,
                password: hashedPassword,
                location: userLocation,
            });

            /* ------------------------ Create New National Cart ------------------------ */
            const nationalCard = await License.create({
                type: 'national_card',
                front: nationalFrontURL,
                back: nationalBackURL,
            });

            /* ---------------------------- Create New Driver --------------------------- */
            const driver = await Driver.create({
                user: user._id,
                verified: false,
                visible: false,
                onTrip: false,
                location: userLocation,
                nationalCard: nationalCard,
            });


            /* ---------------------------- Assign The Driver To The User --------------------------- */
            user.driver = driver;
            await user.save();

            /* ---------------------------- Generate Token --------------------------- */
            const token = GenerateSignature({
                _id: user._id,
                driverID: driver._id,
                verified: false,
                hasCar: false,
                hasDriverLicense: false,
            });

            return res.status(201).json({ data: { token: token } });
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}


/* -------------------------------------------------------------------------- */
/*                                Driver Login                                */
/* -------------------------------------------------------------------------- */
export const DriverLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* ------------------------------ Check Inputs ------------------------------ */
        const loginInputs = plainToClass(LoginInput, req.body);
        const errors = await classValidator(loginInputs);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        /* ----------------------- Check If User Already Exist ---------------------- */
        const existUser = await User
        .findOne({ "email": loginInputs.username.replace(/ /g, "") }).populate('location');

        if (existUser) {

            /* ---------------------------- Validate Password --------------------------- */
            const validPassword = await ValidatePassword(loginInputs.password, existUser.password, existUser.salt);

            if (validPassword) {

                /* ---------------------------- Generate Token --------------------------- */
                const token = GenerateSignature({
                    _id: existUser._id,
                    driverID: existUser.driver,
                    verified: existUser.driver.verified,
                    hasCar: existUser.driver.car != null,
                    hasDriverLicense: existUser.driver.driverLicense != null,
                });

        
                
                 return res.status(200).json({ data: { token: token, user: existUser } });
                
            }



        }
        return res.status(400).json({ message: LOGIN_FAILED_ERROR_MSG });

    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

/* -------------------------------------------------------------------------- */
/*                              Check Email Exist                             */
/* -------------------------------------------------------------------------- */

export const CheckEmailExist = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const email = req.body.email;
        const user = await User.findOne({ email: email.replace(/ /g, "") });

        if (user) {
            return res.status(200).json({ data: true });
        }

        return res.status(200).json({ data: false });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}


