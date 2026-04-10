import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { CORS_OPTIONS } from "./config";
import App from "./services/AppService";
import dbConnection from "./services/DBService";
import { connectAdmin, initIO } from "./services/SockerIO";
config();

const app = express();

const startServer = async () => {
  app.use(cors(CORS_OPTIONS));
  /* ----------------------------- Initialize App ----------------------------- */
  await App(app);
  /* ---------------------------- Connect To MogoDB --------------------------- */
  await dbConnection(process.env.MONGO_URL!);
  /* --------------------- Create App Server -------------------- */
  if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(process.env.PORT ?? 3000, () => {
      console.log("App Is Running on PORT: " + (process.env.PORT ?? 3000));
    });
    /* --------------------- Initialize WebSocket.IO Service -------------------- */
    initIO(server);
  }
  /* ------------------------------ Connect Admin ----------------------------- */
  connectAdmin(process.env.JWT_KEY!);
};

if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export default app;
