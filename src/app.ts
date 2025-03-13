import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHanalar from './app/middlewares/globalErrorHanalar';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(cors());
app.use(express.json());

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {

  const a = 'test';
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHanalar);
app.use(notFound);

export default app;
