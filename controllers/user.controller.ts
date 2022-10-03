import { Request, Response } from 'express';
import { prisma } from '../prisma/index';
import { cookie } from '../utils/cookie';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find whether the user exist
    // const searchUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // encript the password before create the user
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    // send to the cookie
    cookie(user, res);
  } catch (error) {
    console.log(error);
  }
};
