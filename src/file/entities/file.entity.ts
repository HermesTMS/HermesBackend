import { Driver } from "src/driver/entities/driver.entity";
import { Order } from "src/order/entities/order.entity";
import { Package } from "src/package/entities/package.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    fileId: string;
    @Column({
        nullable: false
    })
    fileSize: string;
    @Column({
        nullable: false
    })
    fileName: string;
    @Column({
        nullable: false
    })
    fileLocation: string;
    @ManyToOne(() => Driver, driver => driver.documents)
    driver: Driver;
    @ManyToOne(() => Package, pack => pack.files)
    package: Package;
    @ManyToOne(() => Order, order => order.files)
    order: Order
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
