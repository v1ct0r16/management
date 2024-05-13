import { Base } from "src/entity/base.entity";
import { User } from "src/entity/user.entity";
import { Column, ManyToOne } from "typeorm";

export class ProductEntity extends Base{
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    price: number;

    @Column()
    isEmpty: boolean;

    @ManyToOne(()=>User, (user)=>user.product)
    user: User;
}
