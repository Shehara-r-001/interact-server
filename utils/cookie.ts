import { Response } from 'express';
import { getJWT } from '../helpers/getJwt';

type TUser = {
  id: string;
  email: string;
  password: string | undefined;
};

export const cookie = (user: TUser, res: Response) => {
  const token = getJWT(user.id);
  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.password = undefined;
  res.status(200).cookie('cookie', token, options).json({
    success: true,
    token,
  });
};
