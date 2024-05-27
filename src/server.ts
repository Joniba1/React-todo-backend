import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import auth from './auth/auth';
import tasks from './tasks/tasks.controller';
import tasksUtilities from './tasks/tasks-utilities.controller';
import helmet from 'koa-helmet';
import { initializeDatabase } from './database/initializeDatabase';

import Knex from 'knex';
import knexConfig from './database/knexfile';

const database = Knex(knexConfig);

const app = new Koa();
const port = process.env.PORT || 3001;
const base_url = 'http://localhost';

initializeDatabase()
  .then(() => {
    app.use(helmet());
    app.use(bodyParser());
    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }));

    app.use(auth.routes());
    app.use(tasks.routes());
    app.use(tasksUtilities.routes());
    

    app.use( async (ctx) => {
      ctx.body = 'Hello, world!';
    });

    app.listen(port, () => {
      console.log(`Server is running at ${base_url}:${port}`);
    });

    app.on('error', (err, ctx) => {
      console.error('Server error', err, ctx);
    });
  })
  .catch((error) => {
    console.error('Initialization error:', error);
  });
