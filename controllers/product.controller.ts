import { prisma } from '../prisma/index';
import { Request, Response } from 'express';
import { fail } from 'assert';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, image, discount, description, ownerId, categoryId } =
      req.body;

    const newProduct: any = await prisma.product.create({
      data: {
        name,
        image,
        price,
        discount,
        description,
        ownerId,
        categoryId,
      },
    });

    return res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: 'something went wrong..!' });
  }
};
