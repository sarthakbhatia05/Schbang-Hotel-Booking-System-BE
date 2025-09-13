import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateSpecialPriceDto {
    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsDateString()
    startDate!: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

}
