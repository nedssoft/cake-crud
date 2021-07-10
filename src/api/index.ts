import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import routes from '../routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

//default landing:
app.all('*', (req, res) => {
  res.status(404).send({
    status: 'failed',
    status_code: 404,
    message: 'Resource not found',
  });
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.json({
    status: 'error',
    message: error.message,
  });
};
app.use(errorHandler);

export default app;
