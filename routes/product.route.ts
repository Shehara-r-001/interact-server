import express, { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
  getProductByCategory,
  getProductsByUser,
} from '../controllers/product.controller';

const router = express.Router();

router.post('/create', createProduct);

router.get('/all', getAllProducts);

router.get('/category', getProductByCategory);

router.get('/find/:id', getProduct);

router.get('/category/:cat', getProductByCategory);

router.get('/users', getProductsByUser);

export default router;
