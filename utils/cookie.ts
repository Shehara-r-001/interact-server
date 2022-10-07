import { Response } from 'express';
import { getJWT } from '../helpers/getJwt';

type TUser = {
  id: string;
  email: string;
  password: string | undefined;
};

export const cookie = (user: TUser, res: Response) => {
  const token = getJWT(user.email);
  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie('cookie', token, options).json({
    success: true,
    user_email: user.email,
    token,
  });
};
