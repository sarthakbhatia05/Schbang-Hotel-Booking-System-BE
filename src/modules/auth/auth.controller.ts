
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json(`User ${user.email} registered successfully`);
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.login(req.body);
        res.json({ token: user });
    } catch (err) {
        next(err);
    }
};
