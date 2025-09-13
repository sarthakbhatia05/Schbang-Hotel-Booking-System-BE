import { UserModel } from '../user/user.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { comparePassword, hashPassword } from '../../utils/auth';
import createError from "http-errors";
import jwt from 'jsonwebtoken';


export class AuthService {

    async signup(registerDto: SignupDto) {
        const hashedPassword = await hashPassword(registerDto.password);
        const user = new UserModel({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            role: registerDto.role || 'user',
        });
        await user.save();
        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await UserModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new createError.NotFound('User not found');
        }
        const isMatch = await comparePassword(loginDto.password, user.password);
        if (!isMatch) {
            throw new createError.BadRequest('Invalid credentials');
        }
        const payload = { id: user._id, role: user.role, username: user.name, useremail: user.email };
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, jwtSecret!, { expiresIn: '5h' });

        return token;

    }
}
