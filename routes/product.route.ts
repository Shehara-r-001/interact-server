import express, { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductByCategory,
} from '../controllers/product.controller';

const router = express.Router();

router.post('/create', createProduct);

router.get('/all', getAllProducts);

router.get('/category', getProductByCategory);

export default router;
