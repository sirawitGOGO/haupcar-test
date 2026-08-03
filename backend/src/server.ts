import express, { Request, Response } from 'express';
import cors from 'cors';
import configs from './configs/config';
import database from './database/database';
import router from './routes';

const app = express();
const port = configs.port;

app.use(express.json());
app.use(
  cors({
    origin: [configs.frontendUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
    res.send(`server already start`);
});

const startServer = async () => {
    try {
        await database.sequelize.authenticate();
        await database.sequelize.sync({
            force: false
        });
        console.log("database connection successful")
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    } catch (error) {
        console.error(`database connection failed: ${error}`);
    }
}

startServer();