import { Request, Response } from 'express';
import { hashString } from '../helpers/hashString';
import { prisma } from '../prisma/index';
import { cookie } from '../utils/cookie';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const hPassword = await hashString(password);

    let userRole: string;

    if (role === 'Sell') userRole = 'SELLER';
    else userRole = 'BUYER';

    const searchUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!searchUser) {
      const user = await prisma.user.create({
        data: {
          email,
          password: hPassword,
          role: userRole as any,
        },
      });

      cookie(user, res);
    } else {
      res.status(400).json({ error: 'User aleady exists..!' });
    }
  } catch (error) {
    console.error(error);
  }
};
