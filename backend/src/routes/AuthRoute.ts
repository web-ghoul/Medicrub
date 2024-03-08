import express from 'express';
import { DriverLogin, DriverRegister } from '../controllers';

const router = express.Router();

router.post(
    '/DriverLogin',
    DriverLogin
);


router.post(
    '/DriverRegister',
    DriverRegister,
);



export { router as AuthRoute };