import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
