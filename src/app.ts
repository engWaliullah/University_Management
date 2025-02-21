import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import config from './app/config';
import { UserRoute } from './app/modules/user/user.route';
import { StudentRoutes } from './app/modules/student/srudent.router';
import globalErrorHanalar from './app/middlewares/globalErrorHanalar';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(config.database_url);
});

app.use(globalErrorHanalar);

export default app;
