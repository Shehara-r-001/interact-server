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

export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const categoryQuery = req.query.cat as string;

    const category = await prisma.category.findUnique({
      where: {
        name: categoryQuery,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        categoryId: category?.id,
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
            email: true,
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
    return res.status(400).json({ success: false, error: 'Bad request..!' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Bad request..!' });
  }
};

export const getProductsByUser = async (req: Request, res: Response) => {
  try {
    const userID = req.query.seller as string;

    const products = await prisma.product.findMany({
      where: {
        ownerId: userID,
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Bad request..!' });
  }
};
