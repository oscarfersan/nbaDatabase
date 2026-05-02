import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError } from '../types';

export interface AdminJwtPayload {
  sub: string;
  role: 'admin';
}

function getAdminJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new AppError('ADMIN_JWT_SECRET is not defined in environment variables');
  }

  return secret;
}

export function signAdminJwt(expiresIn: string): string {
  const secret = getAdminJwtSecret();
  const payload: AdminJwtPayload = {
    sub: 'admin',
    role: 'admin',
  };

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, secret, options);
}

export function verifyAdminJwt(token: string): AdminJwtPayload {
  const secret = getAdminJwtSecret();
  const decoded = jwt.verify(token, secret);

  if (typeof decoded !== 'object' || decoded === null) {
    throw new AppError('Invalid admin JWT payload');
  }

  const payload = decoded as Partial<AdminJwtPayload>;
  if (payload.sub !== 'admin' || payload.role !== 'admin') {
    throw new AppError('Invalid admin JWT payload');
  }

  return payload as AdminJwtPayload;
}
