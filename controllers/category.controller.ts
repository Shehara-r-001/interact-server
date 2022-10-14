import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const nameInLower = name.toString().toLowerCase();

    const category = await prisma.category.findFirst({
      where: {
        name: nameInLower,
      },
    });

    if (!category) {
      const newCategory: any = await prisma.category.create({
        data: {
          name,
        },
      });

      return res.status(200).json({ success: true, data: newCategory });
    } else
      return res
        .status(400)
        .json({ success: false, error: 'Category already exist..!' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Something went wrong' });
  }
};
