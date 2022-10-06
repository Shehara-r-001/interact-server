import express from 'express';
import {
  getUserByEmail,
  loginUser,
  signUpUser,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', signUpUser);

router.post('/login', loginUser);

router.get('/getUser/:email', getUserByEmail);

export default router;
