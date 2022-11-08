import express from 'express';
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller';

const router = express.Router();

router.get('/all', getAllCategories);

router.post('/create', createCategory);

export default router;
