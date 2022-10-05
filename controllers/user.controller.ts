import { Request, Response } from 'express';
import { hashString } from '../helpers/hashString';
import { prisma } from '../prisma/index';
import { cookie } from '../utils/cookie';
import bcrypt from 'bcryptjs';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const hPassword = await hashString(password);

    let userRole: string;

    if (role === 'Sell') userRole = 'SELLER';
    else userRole = 'BUYER';

    const searchUser = await prisma.user.findUnique({
      where: {
        email,
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) res.status(404).json({ error: 'User does not exist..!' });
    else {
      const isMatch = await bcrypt.compare(password, user?.password);

      if (!isMatch) return res.status(403).json({ error: 'wrong password..!' });

      cookie(user, res);
    }
  } catch (error) {
    console.error(error);
  }
};
