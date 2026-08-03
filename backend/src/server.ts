import express, { Request, Response } from 'express';
import cors from 'cors';
import configs from './configs/config';

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

app.get('/', (req: Request, res: Response) => {
    res.send(`server already start`);
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});