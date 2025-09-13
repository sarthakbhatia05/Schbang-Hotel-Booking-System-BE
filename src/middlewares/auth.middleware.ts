import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from '../modules/user/dto/create-user.dto';
import { StatusCode } from './errorHandler.middleware';

export interface AuthenticatedRequest extends Request {
    userId?: string;
    userRole?: UserRole;
}

export function verifyJwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        (req as AuthenticatedRequest).userId = decoded.id;
        (req as AuthenticatedRequest).userRole = decoded.role;
        next();
    } catch {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
}

export function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    const userRole = (req as AuthenticatedRequest).userRole;
    if (userRole !== UserRole.ADMIN) {
        return res.status(StatusCode.FORBIDDEN).json({ message: 'Forbidden: Admins only' });
    }
    next();
}