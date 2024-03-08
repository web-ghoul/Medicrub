import { Authenticate } from '../middlewares/CommontAuth';

import express from 'express';

import { CheckEmailExist, GetProfile } from '../controllers';

const router = express.Router();

router.post(
    '/Exist',
    CheckEmailExist,
);


router.use(Authenticate);

router.get(
    '/Profile',
    GetProfile,
);


export { router as UserRoute };