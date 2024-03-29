import { Address } from "src/address/entities/address.entity";
import { Client } from "src/client/entities/client.entity";
import { Ensamble } from "src/ensamble/entities/ensamble.entity";
import { Expense } from "src/expense/entities/expense.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Note } from "src/note/entities/note.entity";
import { Package } from "src/package/entities/package.entity";
import { User } from "src/user/user.entity";
import { File } from "src/file/entities/file.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./orderStatus";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    orderId: string;
    @OneToMany(() => Address, addr => addr)
    loadings: Address[];
    @OneToMany(() => Address, addr => addr)
    unloadings: Address[];
    @Column()
    totalKm: number;
    @OneToOne(() => Client)
    sender: Client;
    @OneToOne(() => Client)
    receiver: Client;
    @OneToMany(() => Package, pack => pack.order)
    goods: Package[];
    @Column()
    startTime: Date;
    @Column()
    endTime: Date;
    @Column()
    priceKm: number;
    @OneToMany(() => Expense, expense => expense.order)
    expenses: Expense[];
    @Column()
    description: string;
    @OneToOne(() => User)
    creator: User;
    @Column()
    status: OrderStatus;
    @Column()
    createdAt: Date;
    @OneToMany(() => Invoice, inv => inv.order)
    invoices: Invoice[];
    @OneToMany(() => File, file => file.order)
    files: File[];
    @OneToMany(() => Note, note => note.order)
    notes: Note[];
    @OneToOne(() => Ensamble)
    ensamble: Ensamble;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
