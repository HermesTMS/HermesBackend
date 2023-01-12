import { Client } from "src/client/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactPerson {
    @PrimaryGeneratedColumn('uuid')
    contactPersonId: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    position: string;
    @Column({ nullable: false })
    email: string;
    @Column({ nullable: false })
    phone: string;
    @ManyToOne(() => Client, client => client.contactPerson)
    client: Client;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
