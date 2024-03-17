import { SessionOptions } from 'iron-session';

export interface SessionData {
  username: string;
  email: string;
  userId: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: '',
  email: '',
  userId: '',
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  cookieName: 'auth-cookie',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: true,
  },
  password: '    VERYYLONGPASSWORDS1ab1323898esda345q6781!',
};
