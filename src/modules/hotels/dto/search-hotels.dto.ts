import { IsNotEmpty, IsNumber, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class SearchHotelsDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    lat!: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    long!: number;

    @IsNotEmpty()
    @IsDateString()
    startDate!: string;

    @IsNotEmpty()
    @IsDateString()
    endDate!: string;
}
