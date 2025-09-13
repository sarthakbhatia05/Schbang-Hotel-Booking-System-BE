
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { StatusCode } from '../../middlewares/errorHandler.middleware';

const userService = new UserService();

export const updateUser = async (req: Request, res: Response) => {
    const user = await userService.update(req.params.id, req.body);
    if (!user) return res.status(StatusCode.NOT_FOUND).json({ message: 'User not found' });
    res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await userService.findById(req.params.id);
    if (!user) return res.status(StatusCode.NOT_FOUND).json({ message: 'User not found' });
    res.json(user);
};
