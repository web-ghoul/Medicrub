import { Authenticate } from '../middlewares/CommontAuth';

import express from 'express';


import { CheckDriver, GetDriver, AddDriverLicense, UpdateDriverPosition, UpdateDriverStatus } from '../controllers';

const router = express.Router();

router.use(Authenticate);

router.get(
    '/Check',
    CheckDriver,
);

router.get(
    '/Driver',
    GetDriver,
);


router.post(
    '/AddLicense',
    AddDriverLicense,
);


router.put(
    '/UpdatePosition',
    UpdateDriverPosition,
);


router.put(
    '/UpdateStatus',
    UpdateDriverStatus,
);


export { router as DriverRoute };