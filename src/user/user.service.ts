import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService {
    private readonly user: User[] = [];

    create(user: User){
        this.user.push(user);
    }

    findAll(): User[] {
        return this.user;
    }
    
}
