import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { userRole } from 'src/enum/role.enum';

@Entity()
export class User extends Base {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({unique: true})
  email: string;

  @Column({
    type:'enum',
    enum: userRole,
    default: userRole.member
  })
  

  @Column({ default: true })
  isActive: boolean;
}