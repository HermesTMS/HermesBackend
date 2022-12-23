import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    companyName: string;
}