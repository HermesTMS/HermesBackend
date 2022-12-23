import { Client } from "src/client/entities/client.entity";
import internal from "stream";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Invoice {
    @Column({ nullable: false })
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
}
