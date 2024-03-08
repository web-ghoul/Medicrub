import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { Validate, validate } from 'class-validator';
import { AdminPayload, LocationInput, CreateTripInput, UpdateTripInput } from '../dto';
import { Admin, Trip, Driver, Patient, User, MedicurbLocation } from '../model';
import { DEFAULT_ERROR_MSG, PAGINATION_PAGE, PATIENT, UNAUTHOREOZED_ERROR_MSG } from '../config';
import { GeneratePassword, GenerateSalt } from '../utility/PasswordUtiility';
import { RemoveDateTime } from '../utility/DateUtility';

const addTrip = async (admin: any, tripInputs: CreateTripInput) => {
    /* ------------------------- Create PickUp Location ------------------------- */
    const pickupLocation = await MedicurbLocation.create({
        latitude: tripInputs.pickup.latitude,
        longitude: tripInputs.pickup.longitude,
        address: tripInputs.pickup.address,
        coordinates: [
            parseFloat(tripInputs.pickup.longitude),
            parseFloat(tripInputs.pickup.latitude),
        ],
    });

    /* ------------------------- Create Destination Location ------------------------- */
    const destinationLocation = await MedicurbLocation.create({
        latitude: tripInputs.destination.latitude,
        longitude: tripInputs.destination.longitude,
        address: tripInputs.destination.address,
        coordinates: [
            parseFloat(tripInputs.destination.longitude),
            parseFloat(tripInputs.destination.latitude),
        ],
    });

    /* --------------------- Check If Patient Already Exist --------------------- */
    var patient = await User.findOne({ phone: tripInputs.phone, type: PATIENT });

    if (!patient) {
        /* ------------------------------ Hash Password ----------------------------- */
        const salt = await GenerateSalt();
        const hashedPassword = await GeneratePassword('hGYW72625CGDj', salt);

        const patientLocation = await MedicurbLocation.create({
            latitude: tripInputs.pickup.latitude,
            longitude: tripInputs.pickup.longitude,
            address: tripInputs.pickup.address,
            coordinates: [
                parseFloat(tripInputs.pickup.longitude),
                parseFloat(tripInputs.pickup.latitude),
            ],
        });


        const patientObj = await Patient.create({
            location: patientLocation,
        });

        /* --------------------------- Create New Patient --------------------------- */
        patient = await User.create({
            firstName: tripInputs.firstName,
            lastName: tripInputs.lastName,
            birthDate: tripInputs.birthDate,
            type: PATIENT,
            phone: tripInputs.phone.replace(/ /g, ""),
            salt: salt,
            password: hashedPassword,
            location: patientLocation,

            patient: patientObj,
        });
    }

    /* ----------------------------- Create New Trip ---------------------------- */
    const trip = await Trip.create({
        driver: tripInputs.driver,
        patient: patient,
        pickup: pickupLocation,
        destination: destinationLocation,
        cost: tripInputs.cost,

        date: RemoveDateTime(new Date(tripInputs.date)),
        time: tripInputs.time,
        type: tripInputs.type,
        addedBy: admin,
        number: tripInputs.number,
        specialNeeds: tripInputs.specialNeeds,
    });
    return trip;
}

/* -------------------------------------------------------------------------- */
/*                            Create Trip Manually                            */
/* -------------------------------------------------------------------------- */

export const CreateTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const tripInputs = plainToClass(CreateTripInput, req.body);

                /* ----------------------------- Validate inputs ---------------------------- */
                const errors = await validate(tripInputs);
                if (errors.length > 0) {
                    return res.status(400).json(errors);
                }

                const trip = await addTrip(admin, tripInputs);
                return res.status(201).json({ data: trip });
            }
        }
        return res.status(400).json({ message: UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

/* -------------------------------------------------------------------------- */
/*                              Create Multi Trip                             */
/* -------------------------------------------------------------------------- */
export const CreateMultiTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = await Admin.findById(adminPayload._id);

            if (admin) {

                if (req.body instanceof Array) {
                    /* ----------------------------- Extract Inputs ----------------------------- */
                    const validInputs: CreateTripInput[] = [];
                    /* ---------------------------- Run Inputs Validator --------------------------- */
                    for (const input of req.body) {
                        const tripInputs = plainToClass(CreateTripInput, input);

                        /* ----------------------------- Validate inputs ---------------------------- */
                        const errors = await validate(tripInputs);
                        if (errors.length > 0) {
                            return res.status(400).json(errors);
                        }
                        /* ------------------------- Add To Validated nputs ------------------------- */
                        validInputs.push(tripInputs);
                    }

                    /* -------------------------- Continue To Add Trips ------------------------- */
                    for (const tripInputs of validInputs) {
                        await addTrip(admin, tripInputs);
                    }
                    /* ----------------------------- Return Response ---------------------------- */
                    return res.status(201).json({ data: null });
                }

                /* ------------------------- Invalid Request Object ------------------------- */
                return res.status(400).json({ message: DEFAULT_ERROR_MSG });
            }
        }
        return res.status(400).json({ message: UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

/* -------------------------------------------------------------------------- */
/*                                 Update Trip                                */
/* -------------------------------------------------------------------------- */
export const UpdateTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {
            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const trip = await Trip.findById(req.query.id)
                    .populate('pickup')
                    .populate('destination')
                    .populate(
                        {
                            path: 'patient',
                            populate: 'location',
                        }
                    );

                if (trip) {
                    const tripInputs = plainToClass(UpdateTripInput, req.body);

                    /* ---------------------- Check New Phone Already Used ---------------------- */
                    if (tripInputs.phone) {
                        const existPatient = await User.findOne({ phone: tripInputs.phone!.replace(/ /g, ""), });

                        if (existPatient) {                            
                            trip.patient = existPatient;                            
                        } else {
                            trip.patient.phone = tripInputs.phone ?? trip.patient.phone;                            
                        }
                    }
                    /* ----------------------------- Update Patient ----------------------------- */
                    trip.patient.firstName = tripInputs.firstName ?? trip.patient.firstName;
                    trip.patient.lastName = tripInputs.lastName ?? trip.patient.lastName;

                    /* ------------------------------ Update Driver ----------------------------- */
                    trip.driver = tripInputs.driver;
                    /* ------------------------------- Update Trip ------------------------------ */
                    trip.date = RemoveDateTime(new Date(tripInputs.date ?? String(trip.date)));
                    trip.time = tripInputs.time ?? trip.time;
                    trip.cost = tripInputs.cost ?? trip.cost;
                    trip.number = tripInputs.number ?? trip.number;
                    trip.specialNeeds = tripInputs.specialNeeds ?? trip.specialNeeds;
                    /* ------------------------------ Update Pick Up ----------------------------- */
                    var pickup = trip.pickup;
                    pickup.latitude = tripInputs.pickup?.latitude ?? trip.pickup.latitude;
                    pickup.longitude = tripInputs.pickup?.longitude ?? trip.pickup.longitude;
                    pickup.address = tripInputs.pickup?.address ?? trip.pickup.address;
                    pickup.coordinates = [
                        parseFloat(tripInputs.pickup?.longitude ?? String(trip.pickup.longitude)),
                        parseFloat(tripInputs.pickup?.latitude ?? String(trip.pickup.latitude)),
                    ];
                    /* --------------------------- Update Destination --------------------------- */
                    var destination = trip.destination;
                    destination.latitude = tripInputs.destination?.latitude ?? trip.destination.latitude;
                    destination.longitude = tripInputs.destination?.longitude ?? trip.destination.longitude;
                    destination.address = tripInputs.destination?.address ?? trip.destination.address;
                    destination.coordinates = [
                        parseFloat(tripInputs.destination?.longitude ?? String(trip.destination.longitude)),
                        parseFloat(tripInputs.destination?.latitude ?? String(trip.destination.latitude)),
                    ];
                    /* ------------------------------ Save Updates ------------------------------ */
                    trip.updatedBy = admin;
                    await pickup.save();
                    await destination.save();
                    await trip.patient.save();
                    await trip.save();
                    return res.status(201).json({ data: null });
                }
            }
        }
        return res.status(400).json({ message: UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });
    }
}
/* -------------------------------------------------------------------------- */
/*                                Get All Trips                               */
/* -------------------------------------------------------------------------- */

export const GetAllTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const adminPayload = req.user as AdminPayload;

        if (adminPayload) {

            /* ----------------------------- Validate Admin ----------------------------- */
            const admin = await Admin.findById(adminPayload._id);

            if (admin) {
                const page = Number.parseInt(req.params.page);
                const date = RemoveDateTime(new Date(String(req.query.date ?? '')));
                console.log(date);

                const trips = await Trip.find({ date: date })
                    .skip(PAGINATION_PAGE * page)
                    .limit(PAGINATION_PAGE)
                    .populate('pickup')
                    .populate('destination')
                    .populate({
                        path: 'patient',
                        select: 'firstName lastName profileImage email phone'
                    })
                    .populate({
                        path: 'driver',
                        select: '_id user',
                        populate: {
                            path: 'user',
                            select: "firstName lastName profileImage email phone",
                        }
                    })
                    .sort('-createdAt');

                return res.status(200).json({ data: trips });
            }
        }
        return res.status(400).json({ message: UNAUTHOREOZED_ERROR_MSG });
    }
    catch (_) {
        console.log(_);
        return res.status(400).json({ message: DEFAULT_ERROR_MSG });

    }
}

