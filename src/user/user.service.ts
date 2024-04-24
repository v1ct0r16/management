import { BadRequestException, HttpException, Injectable, Req, Res, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response} from 'express'
@Injectable()
export class UserService {
  constructor(@InjectRepository(User)private userRepo:Repository<User>, private readonly jwtService:JwtService){}
  async SignUp(payload: CreateUserDto) {
    payload.email = payload.email.toLowerCase();
    const {email, Password, ...rest}=payload;
    const user = await this.userRepo.findOne({where:{email}})
    if(user) throw new HttpException('sorry user with this email already exist', 400)

        const hashPassword= await bcrypt.hash(Password,10)
        
        try{
            const user = await this.userRepo.save({email, password:hashPassword, ...rest});
            delete user.password;
            return user;
           
        } catch (error) {
            if (error.code === '22p02'){
                throw new BadRequestException ('admin role should be lowercase')
            }
            return error;
        }
  }

  async login(payload:LoginDto,@Req() req:Request, @Res() res:Response){
    const  {email, password} = payload;
    const user = await this.userRepo.findOne({where:{email}})
    if(!user) throw new HttpException('user not found', 404);

    const  isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw new HttpException('user not found', 404);
    }

    const token = await this.jwtService.signAsync({id:user.id, email:user.email, role:user.role});
    res.cookie('userAuthenticated', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });

    return res.send({
      message: 'User Login succesfully',
      userToken: token,
      userDetails: user
    })


  }
    

}
