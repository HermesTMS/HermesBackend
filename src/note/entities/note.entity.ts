import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    noteId: string;
    @ManyToOne(() => Order, order => order.notes)
    creator: User;
    @Column()
    description: string;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdTimestamp: Date;
}
