import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseStatus } from "./expenseStatus";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    expenseId: string;
    @Column({ nullable: false })
    name: string;
    @Column()
    description: string;
    @Column()
    status: ExpenseStatus;
    @Column({ nullable: false })
    amount: number;
    @ManyToOne(() => Order, order => order.expenses)
    order: Order
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
