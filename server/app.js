
import express from 'express';
import { configRoutes } from './routers/configRoutes.js';
import { logger } from './middlewares.js/logs.js';
import cors from "cors";


const app = express();
app.use(express.json());
app.use(logger);
app.use(cors({
    origin: "*",
    credentials: true
}));


configRoutes(app);

const PORT = 3131;

export default function startServer() {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer()