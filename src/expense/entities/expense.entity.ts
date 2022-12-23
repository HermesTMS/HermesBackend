import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
