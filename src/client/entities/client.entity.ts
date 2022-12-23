import { Address } from "src/address/entities/address.entity";
import { ContactPerson } from "src/contact-person/entities/contact-person.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BankingDetails } from "./bankingDetails.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    clientId: string;
    @Column({
        nullable: false
    })
    companyName: string;
    @Column({
        nullable: false
    })
    contactPerson: ContactPerson[];
    @Column({
        nullable: false
    })
    address: Address;
    @Column({
        nullable: false
    })
    taxId: string;
    @Column({
        nullable: false
    })
    registrationId: string;
    @Column()
    bankingDetails: BankingDetails;
    @Column()
    legalRepresentative: ContactPerson;
    @OneToMany(() => Invoice, inv => inv.client)
    invoices: Invoice[];
}
