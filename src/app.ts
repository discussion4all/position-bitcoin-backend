import express, {Request, Response} from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {logger} from "./middleware/logger";

import {userRouter} from "./routes/user-routes";
import {bitcoinRouter} from "./routes/bitcoin-routes";
import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middleware/error-handler";

const app = express();
app.use(json());
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is working...');
});

app.use(userRouter);
app.use(bitcoinRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};
