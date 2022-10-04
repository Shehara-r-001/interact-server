import bcrypt from 'bcryptjs';

export const hashString = (password: string) => {
  return bcrypt.hash(password, 10);
};
