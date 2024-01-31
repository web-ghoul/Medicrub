import { Authenticate } from '../middlewares/CommontAuth';

import express from 'express';
import { CreateCar, AddCarAlbum, GetMyCar } from '../controllers';


const router = express.Router();

router.use(Authenticate);

router.post(
    '/Create',
    CreateCar,
);

router.post(
    '/AddAlbum',
    AddCarAlbum,
);

router.get(
    '/MyCar',
    GetMyCar,
);

export { router as CarRoute };