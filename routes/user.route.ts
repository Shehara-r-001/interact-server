import express from 'express';
import {
  getUser,
  getUserByEmail,
  loginUser,
  signUpUser,
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', loginUser);

router.get('/getUser/:email', getUserByEmail);

// @ts-ignore
router.get('/verify', verifyToken, getUser);

export default router;
