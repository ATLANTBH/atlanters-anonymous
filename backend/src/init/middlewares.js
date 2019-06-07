import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default async ({ expressApp }) => {
  expressApp.use(json());
  expressApp.use(cookieParser(process.env.COOKIE_S));
  expressApp.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
};
