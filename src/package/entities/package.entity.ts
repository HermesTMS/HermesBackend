import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { fileURLToPath } from "url";

@Entity()
export class Package {
    @PrimaryGeneratedColumn('uuid')
    packageId: string;
    @Column()
    height: number;
    @Column()
    width: number;
    @Column()
    weight: number;
    @Column()
    description: string;
    @ManyToOne(() => Order, order => order.goods)
    order: Order;
    @ManyToOne(() => File, file => file)
    files: File[];
}
