import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { CORS_OPTIONS } from "./config";
import App from "./services/AppService";
import dbConnection from "./services/DBService";
import { connectAdmin, initIO } from "./services/SockerIO";
config();

const app = express();

app.use(cors(CORS_OPTIONS));

const initApp = async () => {
  /* ----------------------------- Initialize App ----------------------------- */
  await App(app);
  /* ---------------------------- Connect To MogoDB --------------------------- */
  await dbConnection(process.env.MONGO_URL!);
  /* ------------------------------ Connect Admin ----------------------------- */
  connectAdmin(process.env.JWT_KEY!);
};

// Top-level initialization for serverless
initApp().catch(console.error);

if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    /* --------------------- Create App Server -------------------- */
    const server = app.listen(process.env.PORT ?? 3000, () => {
      console.log("App Is Running on PORT: " + (process.env.PORT ?? 3000));
    });
    /* --------------------- Initialize WebSocket.IO Service -------------------- */
    initIO(server);
  };
  startServer();
}

export default app;
