import { IsNotEmpty, IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class RegisterHotelDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    location!: { lat: number; long: number };

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    photos?: string[];

    @IsNotEmpty()
    @IsNumber()
    defaultPrice!: number;

}
