import { json } from 'body-parser';
import cookieParser from 'cookie-parser';

export default async ({ expressApp }) => {
  expressApp.use(json());
  expressApp.use(cookieParser(process.env.COOKIE_S));
};
