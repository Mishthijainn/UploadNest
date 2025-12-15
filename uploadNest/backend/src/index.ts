import 'dotenv/config';
import './config/passport.config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { Env } from './config/env.config';
import cors, { CorsOptions } from 'cors';
import { UnauthorizedException } from './utils/app-error';
import { asyncHandler } from './middlewares/asyncHander.middleware';
import { HTTPSTATUS } from './config/http.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database.config';
import internalRoutes from './routes/internal';
import passport from 'passport';
import publicRoutes from './routes/public';
import { logTail } from './config/logtail.config';

const app = express();

const allowedOrigins = Env.ALLOWED_ORIGINS?.split(',');

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const errorMsg = `CORS error: Origin ${origin} is not allowed`;
      callback(new UnauthorizedException(errorMsg), false);
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(passport.initialize());

app.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: 'Hello Subscribe to the channel',
    });
  }),
);

app.use(`${Env.BASE_PATH}`, internalRoutes);
app.use(publicRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    const server = app.listen(Env.PORT, () => {
      logger.info(
        `Server listening on port ${Env.PORT} in ${Env.NODE_ENV} mode`,
      );
    });

    const shutdownSignals = ['SIGTERM', 'SIGINT'];

    shutdownSignals.forEach((signal) => {
      process.on(signal, async () => {
        logger.warn(`${signal} recieved: shutting down gracefully`);

        try {
          server.close(() => {
            logger.warn('HTTP server closed');
          });
          //disconnect db
          await disconnectDatabase();

          await logTail.flush();

          process.exit(0);
        } catch (error) {
          logger.error(`Error occured during shutting down`, error);
          process.exit(1);
        }
      });
    });
  } catch (error) {
    logger.error(`Failed to start server`, error);
    process.exit(1);
  }
}

startServer();
