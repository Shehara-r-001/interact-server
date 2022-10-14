import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import productsRouter from './routes/product.route';
import categoryRouter from './routes/category.route';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3333;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
