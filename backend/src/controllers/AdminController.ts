import { Request, Response, NextFunction } from 'express';
import { Admin, Car, CarAlbum, Driver, License, MedicurbLocation, User } from '../model';
import { DEFAULT_ERROR_MSG, EMAIL_EXIST_ERROR_MSG, NOT_EXIST_ERROR_MSG, PAGINATION_PAGE, REQUIREMENTS_ERROR_MSG, USERNAME_EXIST_ERROR_MSG } from '../config';
import { AdminPayload, CreateAdminInput, CreateCarInput, DriverRegisterInput, DriverUpdateInput, LoginInput } from '../dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility/PasswordUtiility';
import { GenerateSignature } from '../utility/TokenUtility';
import formidable from 'formidable';
import { ExtractFiles, ExtractForm } from '../middlewares/FilesExtractor';
import { UploadFile } from '../services/UploadService';



/* -------------------------------------------------------------------------- */
/*                              Create New Admin                              */
/* -------------------------------------------------------------------------- */

export const CreateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {
            const admin = await Admin.findById(adminPayload._id);
            if (admin) {

                /* ----------------------------- Validate Inputs ---------------------------- */
                const adminInputs = plainToClass(CreateAdminInput, req.body);
                const errors = await validate(adminInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }

                const existAdmin = await Admin.findOne({ username: adminInputs.username });
                if (existAdmin) {
                    return res.status(400).json({ message: USERNAME_EXIST_ERROR_MSG });
                }


                /* ------------------------------ Hash Password ----------------------------- */
                const salt = await GenerateSalt();
                const hashedPassword = await GeneratePassword(adminInputs.password, salt);

                /* ---------------------------- Create New Admin ---------------------------- */
                const newAdmin = await Admin.create({
                    name: adminInputs.name,
                    username: adminInputs.username,
                    salt: salt,
                    password: hashedPassword,
                });

                if (newAdmin) {
                    return res.status(201).json({ data: newAdmin });
                }
            }
        }


    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

/* -------------------------------------------------------------------------- */
/*                                 Admin Login                                */
/* -------------------------------------------------------------------------- */
export const AdminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        /* ----------------------------- Validate Inputs ---------------------------- */
        const adminInputs = plainToClass(LoginInput, req.body);
        const errors = await validate(adminInputs);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const admin = await Admin.findOne({ username: adminInputs.username });

        if (admin) {
            const validPassword = await ValidatePassword(adminInputs.password, admin.password, admin.salt);
            if (validPassword) {
                const token = GenerateSignature({
                    _id: admin._id,
                    username: admin.username,
                });

                return res.status(201).json({ token: token });
            }
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}


/* -------------------------------------------------------------------------- */
/*                              Create New Driver                             */
/* -------------------------------------------------------------------------- */

export const AdminCreateDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);
            if (admin) {

                const [fields, images] = await ExtractForm(req);

                /* ------------------------------ Check Inputs ------------------------------ */
                const driverInputs = plainToClass(DriverRegisterInput, fields);
                const errors = await validate(driverInputs);

                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }

                if (!images['profile'] || !images['nationalFront'] || !images['nationalBack']) {
                    return res.status(400).json({ message: REQUIREMENTS_ERROR_MSG });
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
                    });

                    /* --------------------------- Create New User --------------------------- */
                    const user = await User.create({
                        firstName: driverInputs.firstName,
                        lastName: driverInputs.lastName,
                        birthDate: driverInputs.birthDate,
                        type: 'driver',
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
                        user: user,
                        verified: false,
                        visible: false,
                        onTrip: false,
                        location: userLocation,
                        nationalCard: nationalCard,
                    });


                    /* ---------------------------- Assign The Driver To The User --------------------------- */
                    user.driver = driver;
                    await user.save();

                    return res.status(201).json({ data: driver });
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
/*                              Add Driver License                            */
/* -------------------------------------------------------------------------- */


export const AdminAddDriverLicense = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {
            const admin = await Admin.findById(adminPayload._id);
            if (admin) {

                const driverID = req.query.id;
                const driver = await Driver.findById(driverID)
                    .select('driverLicense')
                    .populate('driverLicense');

                if (driver) {

                    /* -------------------------- Extract License Data -------------------------- */
                    const images = await ExtractFiles(req);

                    if (!images['front'] || !images['back']) {
                        return res.status(400).json({ message: REQUIREMENTS_ERROR_MSG });
                    }

                    const front = images['front'][0] as formidable.File;
                    const back = images['back'][0] as formidable.File;

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
/*                             Get Driver Details                             */
/* -------------------------------------------------------------------------- */

export const AdminGetDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const driverID = req.query.id;
                const driver = await Driver.findById(driverID)
                    .populate({
                        path: 'user',
                        populate: 'location'
                    })
                    .populate({
                        path: 'car',
                        populate: 'carAlbum'
                    })
                    .populate('location')
                    .populate('driverLicense')
                    .populate('nationalCard');

                if (driver) {
                    return res.status(200).json({ data: driver });
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
/*                                Update Driver                               */
/* -------------------------------------------------------------------------- */


export const AdminUpdateDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const driverID = req.query.id;
                const [fields, images] = await ExtractForm(req);
                /* ----------------------------- Validate Inputs ---------------------------- */
                const updateInputs = plainToClass(DriverUpdateInput, fields);                                
                const errors = await validate(updateInputs);

                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }

                /* ------------------------------- Get Driver ------------------------------- */
                const driver = await Driver.findById(driverID)
                    .select('-location')
                    .populate({
                        path: 'user',
                        populate: 'location'
                    })                    
                    .populate('driverLicense')
                    .populate('nationalCard');

                if (driver) {                    
                    let profile, nationalFront, nationalBack;
                    let licenseFront, licenseBack;

                    /* ------------------------------ Profile Image ----------------------------- */
                    if (images['profile']) {
                        const file = images['profile'][0] as formidable.File;
                        profile = await UploadFile(file);
                    }

                    /* ------------------------------ National Card ----------------------------- */
                    if (images['nationalFront']) {
                        const file = images['nationalFront'][0] as formidable.File;
                        nationalFront = await UploadFile(file);
                    }
                    if (images['nationalBack']) {
                        const file = images['nationalBack'][0] as formidable.File;
                        nationalBack = await UploadFile(file);
                    }

                    /* ----------------------------- Driver License ----------------------------- */
                    if (images['licenseFront']) {
                        const file = images['licenseFront'][0] as formidable.File;
                        licenseFront = await UploadFile(file);
                    }
                    if (images['licenseBack']) {
                        const file = images['licenseBack'][0] as formidable.File;
                        licenseBack = await UploadFile(file);
                    }                    

                    /* ------------------------------ Update Driver Details ----------------------------- */
                    driver.user.profileImage = profile ?? driver.user.profileImage;
                    driver.user.firstName = updateInputs.firstName;
                    driver.user.lastName = updateInputs.lastName;
                    driver.user.birthDate = updateInputs.birthDate;
                    driver.user.email = updateInputs.email;
                    driver.user.phone = updateInputs.phone;
                    driver.user.ssn = updateInputs.ssn;
                    driver.user.medicalInsurance = updateInputs.medicalInsurance;
                    driver.user.location.latitude = updateInputs.latitude;
                    driver.user.location.longitude = updateInputs.longitude;
                    driver.user.location.address = updateInputs.address;

                    /* -------------------------- Update Driver License ------------------------- */
                    driver.driverLicense.front = licenseFront ?? driver.driverLicense.front;
                    driver.driverLicense.back = licenseBack ?? driver.driverLicense.back;

                    /* ----------------------- Update Driver National Card ---------------------- */
                    driver.nationalCard.front = nationalFront ?? driver.nationalCard.front;
                    driver.nationalCard.back = nationalBack ?? driver.nationalCard.back;

                    /* ------------------------------ Save Updates ------------------------------ */                    
                    await driver.user.save();
                    await driver.user.location.save();
                    await driver.nationalCard.save();
                    await driver.driverLicense.save();
                    await driver.save();

                    return res.status(201).json({ data: driver });

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
/*                               Create New Car                               */
/* -------------------------------------------------------------------------- */

export const AdminCreateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                /* ----------------------------- Validate Inputs ---------------------------- */
                const driverID = req.query.id;
                const [fields, images] = await ExtractForm(req);

                const carInputs = plainToClass(CreateCarInput, fields);
                const errors = await validate(carInputs);

                if (errors.length > 0 || !driverID) {
                    return res.status(400).json(errors);
                }

                if (!images['registration'] || !images['insurance']) {
                    return res.status(400).json({ message: REQUIREMENTS_ERROR_MSG });
                }

                const registration = images['registration'][0] as formidable.File;
                const insurance = images['insurance'][0] as formidable.File;



                const driver = await Driver.findById(driverID).select('car');
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
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });

    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}



/* -------------------------------------------------------------------------- */
/*                              Create Car Album                              */
/* -------------------------------------------------------------------------- */

export const AdminCreateCarAlbum = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                /* ----------------------------- Validate Inputs ---------------------------- */
                const driverID = req.query.id;
                const images = await ExtractFiles(req);

                if (
                    !images['front'] ||
                    !images['back'] ||
                    !images['right'] ||
                    !images['left']) {
                    return res.status(400).json({ message: REQUIREMENTS_ERROR_MSG });
                }


                const front = images['front'][0] as formidable.File;
                const back = images['back'][0] as formidable.File;
                const right = images['right'][0] as formidable.File;
                const left = images['left'][0] as formidable.File;

                const car = await Car.findOne({ driver: driverID });


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

                    if (carAlbum) {
                        car.carAlbum = carAlbum;
                        await car.save();
                        return res.status(201).json({ data: carAlbum });
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
/*                               Get Car Details                              */
/* -------------------------------------------------------------------------- */


export const AdminDriverCarDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const driverID = req.query.id;
                const car = await Car.findOne({ driver: driverID }).populate('carAlbum').populate('carAlbum');

                if (car) {
                    return res.status(200).json({ data: car });
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
/*                               Get All Drivers                              */
/* -------------------------------------------------------------------------- */
export const GetAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {
            const admin = await Admin.findById(adminPayload._id);
            if (admin) {


                const page = Number.parseInt(req.params.page) ?? 0;

                const driver = await Driver.find()
                    .skip(PAGINATION_PAGE * page)
                    .limit(PAGINATION_PAGE)
                    .populate({
                        path: 'user',
                        select: 'firstName lastName profileImage phone email',
                    })
                    .populate('location')
                    .populate('nationalCard')
                    .sort('-createdAt');

                if (driver) {
                    return res.status(200).json({ data: driver });
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
/*                                Get All Cars                                */
/* -------------------------------------------------------------------------- */

export const GetAllCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {
            const admin = await Admin.findById(adminPayload._id);
            if (admin) {


                const page = Number.parseInt(req.params.page);

                const driver = await Driver.find()
                    .skip(PAGINATION_PAGE * page)
                    .limit(PAGINATION_PAGE)
                    .populate({
                        path: 'user',
                        select: 'firstName lastName profileImage phone email',
                    })
                    .populate('location')
                    .populate('nationalCard')
                    .sort('-createdAt');

                if (driver) {
                    return res.status(200).json({ data: driver });
                }

            }
        }

        return res.status(400).json({ message: NOT_EXIST_ERROR_MSG });


    } catch (_) {

        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}
function classValidator(driverInputs: DriverRegisterInput) {
    throw new Error('Function not implemented.');
}

