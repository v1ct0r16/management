import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { userRole } from "src/enum/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'sorry you must put in 8 character'})
    @MaxLength(16,{message: 'password should not be more than 16 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message:'Password must contain atleast One Uppercase, One number and One special key'})
    Password: string;

    @IsOptional()
    @IsString()
    role: userRole;
}
