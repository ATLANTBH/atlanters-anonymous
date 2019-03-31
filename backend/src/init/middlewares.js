import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

export default async (app) => {
  app.use(json());
  app.use(cookieParser(process.env.COOKIE_S));
}