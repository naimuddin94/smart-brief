/*
 * Title: Smart Brief
 * Description: A Backend Application on Express
 * Author: Md Naim Uddin
 * Github: naimuddin94
 * Date: 27/06/2025
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './app/routes';
import { globalErrorHandler, notFound } from './app/utils';

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: [
      'http://10.0.60.43:3000',
      'http://10.0.60.43:3001',
      'http://10.0.60.43:3002',
      'http://10.0.60.43:3003',
    ],
  })
);
app.use(cookieParser());

// static files
app.use('/public', express.static('public'));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Express server is running :(' });
});

//global error handler
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler);

//handle not found
app.use(notFound);

export default app;
