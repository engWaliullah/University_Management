import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';
import { StudentRoutes } from './app/modules/student/srudent.router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(config.database_url);
});

export default app;
