import express from 'express';
import { signUpUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', signUpUser);

export default router;