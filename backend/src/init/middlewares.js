import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true,
  maxAge: 600,
};

export default async ({ expressApp }) => {
  expressApp.use(json());
  expressApp.use(cookieParser(process.env.COOKIE_S));
  expressApp.options('*', cors(corsOptions));
  expressApp.use(cors(corsOptions));
};
