import express from 'express';
import { Login, DriverRegister } from '../controllers';

const router = express.Router();

router.post(
    '/Login',
    Login
);


router.post(
    '/DriverRegister',
    DriverRegister,
);



export { router as AuthRoute };