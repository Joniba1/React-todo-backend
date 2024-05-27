import bcrypt from 'bcrypt';
import Knex from 'knex';
import knexConfig from '../database/knexfile';
import Router from 'koa-router';
import { User } from '../types';
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';


const database = Knex(knexConfig);
const router = new Router();
const SECRET_KEY = 'cornflakes'; 

export const generateToken = (user: User) => {
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateToken = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('jwt');
  if (!token) {
    ctx.status = 401;
    ctx.response.body = { message: 'Access denied. No token provided.' };
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    ctx.state.user = decoded;
    await next();
  } catch (error) {
    ctx.status = 400;
    ctx.response.body = { message: 'Invalid token.' };
  }
};

router.post('/login', async (ctx) => {
  const user = ctx.request.body as User;

  if (!user.username || !user.password) {
    ctx.status = 400;
    ctx.response.body = { errorCode: 'EMPTY_FIELDS' };
    return;
  }

  try {
    const existingUser: User = await database('users').where({ username: user.username }).first();

    if (!existingUser) {
      ctx.status = 404;
      ctx.response.body = { errorCode: 'USER_NOT_FOUND' };
      return;
    }

    const correctPassword = await bcrypt.compare(user.password, existingUser.password);

    if (!correctPassword) {
      ctx.status = 400;
      ctx.body = { errorCode: 'INCORRECT_PASSWORD' };
      return;
    }

    const token = generateToken(user);
    
    ctx.status = 200;
    ctx.response.body = { message: 'Logged in', token }; // Include the token in the response body
  } catch (error) {
    console.error('Error logging in:', error);
    ctx.status = 500;
    ctx.response.body = { errorCode: 'INTERNAL_ERROR' };
  }
});



router.post('/register', async (ctx) => {
  const user = ctx.request.body as User;

  if (!user.username || !user.password) {
    ctx.status = 400;
    ctx.response.body = { errorCode: 'EMPTY_FIELDS' };
    return;
  }

  if (user.username.length > 15) {
    ctx.status = 400;
    ctx.response.body = { errorCode: 'USERNAME_TOO_LONG' };
    return;
  }

  if (user.password.length > 60) {
    ctx.status = 400;
    ctx.response.body = { errorCode: 'PASSWORD_TOO_LONG' };
    return;
  }

  try {
    const existingUser: User = await database('users').where({ username: user.username }).first();

    if (existingUser) {
      ctx.status = 400;
      ctx.response.body = { errorCode: 'USERNAME_TAKEN' };
      return;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await database('users').insert({ username: user.username, password: hashedPassword });

    ctx.status = 201;
    ctx.response.body = 'User registered successfully';
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.status = 500;
    ctx.response.body = { errorCode: 'INTERNAL_ERROR' };
  }
});

export default router;
