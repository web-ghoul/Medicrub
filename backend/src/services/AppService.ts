import express, { Application } from 'express';

import { AuthPayload } from '../dto';
import cors from 'cors';
import morgan from 'morgan';
import { AdminRoute, AuthRoute, DriverRoute, UserRoute, CarRoute } from '../routes';


declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}



export default async (app: Application) => {
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());    
    app.use(morgan('combined'));
     
    app.use('/api/Admin', AdminRoute);
    app.use('/api/Auth', AuthRoute);
    app.use('/api/Drivers', DriverRoute);
    app.use('/api/Cars', CarRoute);
    app.use('/api/Users', UserRoute);

    return app;
}

