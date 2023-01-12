import { Note } from "src/note/entities/note.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @OneToMany(() => Note, note => note.creator)
    notes: Note[];
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text"
    })
    tenantId: string;
}