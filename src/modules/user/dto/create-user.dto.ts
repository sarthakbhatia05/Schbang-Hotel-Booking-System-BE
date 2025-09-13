import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;

    @IsEnum(UserRole)
    role!: UserRole;
}
