import express, { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/product.controller';

const router = express.Router();

router.post('/create', createProduct);

router.get('/all', getAllProducts);

export default router;
