import { Request } from 'express';
export interface VerifyTokenRequest extends Request {
  payload: string;
}
