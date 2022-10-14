import { prisma } from '../prisma/index';
import { Request, Response } from 'express';

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

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: 'Something went wrong..!' });
  }
};
