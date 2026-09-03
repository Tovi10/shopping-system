import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import {
  connectDatabase,
} from './src/config/database.js';

import ordersRouter from './src/routes/ordersRoutes.js';

const app = express();

const PORT =
  process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use(
  '/api/orders',
  ordersRouter
);
async function startServer() {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        console.log(
          `Orders API running on http://localhost:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      'Failed to start server:',
      error
    );

    process.exit(1);
  }
}

startServer();