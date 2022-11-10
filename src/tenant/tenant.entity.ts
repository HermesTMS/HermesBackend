import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    companyName: string;

    @OneToOne(() => User, { eager: true })
    @JoinColumn()
    masterUser: User;
}