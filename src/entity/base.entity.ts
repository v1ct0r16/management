import { Entity, } from "typeorm";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base{
    @PrimaryGeneratedColumn('uuid')
    id: string;

@CreateDateColumn()
created_date:Date
}