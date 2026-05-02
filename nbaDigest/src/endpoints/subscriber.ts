import type { Request, Response, NextFunction } from 'express';
import { addSubscriber, getAllSubscribers } from '../services/subscribers';
import { verifyAdminJwt } from '../auth/adminJwt';

interface CreateSubscriberBody {
  email?: string;
}

function requireAdminJwt(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Missing Authorization header' });
    return;
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Invalid Authorization header' });
    return;
  }

  try {
    verifyAdminJwt(token);
    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Auth] Invalid admin JWT:`, message);
    res.status(401).json({ error: 'Invalid token' });
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function registerSubscriberEndpoints(app: import('express').Application): void {
  app.get('/subscriber', requireAdminJwt, (_req, res) => {
    try {
      const subscribers = getAllSubscribers();
      res.status(200).json({ subscribers });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[Endpoint] Failed to list subscribers:`, message);
      res.status(500).json({ error: 'Failed to list subscribers' });
    }
  });

  app.post('/subscriber', requireAdminJwt, (req: Request, res: Response) => {
    const body = req.body as CreateSubscriberBody;
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !isValidEmail(email)) {
      res.status(400).json({ error: 'Invalid email' });
      return;
    }

    try {
      const subscriber = addSubscriber(email);
      res.status(201).json({ subscriber });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[Endpoint] Failed to add subscriber:`, message);
      res.status(500).json({ error: 'Failed to add subscriber' });
    }
  });
}
