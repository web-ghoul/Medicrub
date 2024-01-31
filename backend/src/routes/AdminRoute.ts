import { Authenticate } from '../middlewares/CommontAuth';

import express from 'express';


import { 
    GetAllDrivers, 
    CreateAdmin, 
    AdminLogin,
    AdminCreateDriver,
    AdminAddDriverLicense,
    AdminCreateCar,
    AdminCreateCarAlbum,
    AdminGetDriver,
    AdminDriverCarDetails,
    AdminUpdateDriver,
 } from '../controllers';

const router = express.Router();


router.post(
    '/Login',
    AdminLogin,
);


router.use(Authenticate);

router.get(
    '/Drivers/:page',
    GetAllDrivers,
);



router.post(
    '/CreateAdmin',
    CreateAdmin,
);


router.post(
    '/CreateDriver',
    AdminCreateDriver,
);



router.post(
    '/AddDriverLicense',
    AdminAddDriverLicense,
);


router.put(
    '/UpdateDriver',
    AdminUpdateDriver,
);


router.post(
    '/CreateCar',
    AdminCreateCar,
);



router.post(
    '/CreateCarAlbum',
    AdminCreateCarAlbum,
);


router.get(
    '/DriverDetails',
    AdminGetDriver,
);


router.get(
    '/DriverCarDetails',
    AdminDriverCarDetails,
);



export { router as AdminRoute };