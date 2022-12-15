import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    companyName: string;
    
    // @OneToMany(() => User, user => user.tenant)
    // users: User[];

    // @OneToOne(() => User, { eager: true })
    // @JoinColumn()
    // masterUser: User;

    // Add OneToMany relationship
}