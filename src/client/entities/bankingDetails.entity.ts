import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BankingDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: false })
    bankName: string;
    @Column({ nullable: false })
    account: string;
    @Column()
    swift: string;
    @Column({ nullable: false })
    currency: string;
}
