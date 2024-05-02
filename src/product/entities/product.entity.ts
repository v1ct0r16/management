import { Base } from "src/entity/base.entity";
import { Column } from "typeorm";

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
}
