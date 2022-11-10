import { Tenant } from "src/tenant/tenant.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user.type";

@Entity()
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
    @OneToOne(() => Tenant, tenant => tenant.masterUser)
    tenant: Tenant;
}