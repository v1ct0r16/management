import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response} from 'express'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    createUSer(@Body() createUserDto: CreateUserDto){
        return this.userService.SignUp(createUserDto);
    }

    @Post('login')
    async login(@Body()payload:LoginDto,@Req() req: Request, @Res() res: Response){
        return await this.userService.login(payload, req, res)
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }  

}


