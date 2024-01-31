import { Authenticate } from '../middlewares/CommontAuth';

import express from 'express';


import { CheckDriver, GetDriver, AddDriverLicense } from '../controllers';

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


export { router as DriverRoute };