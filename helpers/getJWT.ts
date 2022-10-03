import jwt from 'jsonwebtoken';

export const getJWT = (userID: string) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET as string, {
    expiresIn: '2 days',
  });
};
