import express, { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
  getProductByCategory,
} from '../controllers/product.controller';

const router = express.Router();

router.post('/create', createProduct);

router.get('/all', getAllProducts);

router.get('/category', getProductByCategory);

router.get('/find/:id', getProduct);

router.get('/category/:cat', getProductByCategory);

export default router;
