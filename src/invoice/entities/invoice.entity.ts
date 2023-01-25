import { Client } from "src/client/entities/client.entity";
import { Order } from "src/order/entities/order.entity";
import internal from "stream";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryColumn()
    invoiceNumber: string;
    @Column({ nullable: false })
    amount: number;
    @Column()
    tax: number;
    @Column({ nullable: false })
    price: number;
    @Column({ nullable: false })
    qty: number;
    @Column({ nullable: false })
    total: number;
    @ManyToOne(() => Client, client => client.invoices)
    client: Client;
    @ManyToOne(() => Order, order => order.invoices)
    order: Order;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
