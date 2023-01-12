import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "src/file/entities/file.entity";

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
    @OneToMany(() => File, file => file.package)
    files: File[];
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
