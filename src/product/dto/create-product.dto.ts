import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
export class ProductDto {
    @IsNotEmpty()
    @MinLength(3,{message:'Name must not be less than 3 characters'})
    @MaxLength(15,{message:'Name must not be more than 15 characters'})
    name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}