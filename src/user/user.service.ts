import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)private userRepo:Repository<User>){}
  async create(payload: CreateUserDto) {
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
    
  findAll() {
    return `This action returns all user`
  }
}
