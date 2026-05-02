import * as dotenv from 'dotenv';
import { signAdminJwt } from '../auth/adminJwt';

dotenv.config();

const expiresIn = process.argv[2] ?? process.env.ADMIN_JWT_TTL ?? '30d';
const token = signAdminJwt(expiresIn);

console.info(token);
