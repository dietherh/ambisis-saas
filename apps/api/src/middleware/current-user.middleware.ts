// src/middleware/current-user.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
        // injeta no request.user
        req['user'] = {
          id: payload.sub,
          organizationId: payload.org,
          role: payload.role,
        };
      } catch (err) {
        // token inválido → request.user fica undefined
        req['user'] = null;
      }
    }
    next();
  }
}