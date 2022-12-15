import { Tenant } from "src/tenant/tenant.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user.type";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column()
    position: string;
    @Column()
    type: UserType;
    @Column()
    masterUser: boolean;
    // Modify this to ManyToOne
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text"
    })
    // @ManyToOne(() => Tenant, tenant => tenant.users)
    tenantId: string;
}