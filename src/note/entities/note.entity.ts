import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    noteId: string;
    @ManyToOne(() => Order, order => order.notes)
    order: Order;
    @ManyToOne(() => User, user => user.notes)
    creator: User;
    @Column()
    description: string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdTimestamp: Date;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
