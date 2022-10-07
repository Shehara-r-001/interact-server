import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { VerifyTokenRequest } from '../interfaces';

export const verifyToken = (
  req: VerifyTokenRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('auth_token');

  if (!token) {
    return res.status(403).json({
      success: false,
      error: 'Unauthorized user..!',
    });
  }

  token = token.split(' ')[1];

  try {
    const user = JWT.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
    };

    req.payload = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Unauthorized user..!',
    });
  }
};
