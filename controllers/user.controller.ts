import { Request, Response } from 'express';
import { hashString } from '../helpers/hashString';
import { prisma } from '../prisma/index';
import { cookie } from '../utils/cookie';
import bcrypt from 'bcryptjs';
import { VerifyTokenRequest } from '../interfaces';

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
      res.status(403).json({
        success: false,
        error: 'User already exist..! Please signin..',
      });
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

    if (!user)
      return res.status(404).json({
        success: false,
        error: 'User does not exist. Please login first',
      });
    else {
      const isMatch = await bcrypt.compare(password, user?.password);

      if (!isMatch)
        return res.status(403).json({
          success: false,
          error: 'Email and password does not match..!',
        });

      cookie(user, res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: 'User cannot be found..!' });
    else {
      const { password, ...rest } = user;
      return res.status(200).json({ success: true, user: rest });
    }
  } catch (error) {
    // console.error(error);
    return res
      .status(404)
      .json({ success: false, error: 'User cannot be found..!' });
  }
};

export const getUser = async (req: VerifyTokenRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.payload,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: 'User cannot be found..!' });
    else {
      const { password, ...rest } = user;
      return res.status(200).json({ success: true, user: rest });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: 'User cannot be found..!' });
  }
};

export const updateUser = async (req: VerifyTokenRequest, res: Response) => {
  const { name, bio, image } = req.body;

  try {
    await prisma.user.update({
      where: {
        email: req.payload,
      },
      data: {
        name,
        bio,
        image,
      },
    });
    res.status(200).json({ success: true, data: { name, bio, image } });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Something went wrong..!' });
  }
};
