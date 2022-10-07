import jwt from 'jsonwebtoken';

export const getJWT = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: '2 days',
  });
};
