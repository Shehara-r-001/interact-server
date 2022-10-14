import express, { Request, Response } from 'express';
import { createProduct } from '../controllers/product.controller';

const router = express.Router();

router.post('/create', createProduct);

export default router;
