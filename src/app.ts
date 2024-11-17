import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.get('/', (req: Request, res: Response) => {
  res.send(config.database_url);
});

export default app;
