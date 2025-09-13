import { IsEmail, IsNotEmpty, MinLength, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../user/dto/create-user.dto';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsEnum(UserRole, { message: 'role must be either admin or user' })
    role?: UserRole;
}
