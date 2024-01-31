import { config } from 'dotenv';
import express from 'express';
import App from './services/AppService';
import dbConnection from './services/DBService';
config();
const startServer = async () => {

    const app = express();
    await App(app);

    await dbConnection(process.env.MONGO_URL!);

    app.listen(
        process.env.PORT??3000,
        () => {
            console.log("App Is Running on PORT: " + process.env.PORT);
        }
    );
}


startServer(); 