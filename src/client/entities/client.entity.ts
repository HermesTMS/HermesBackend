import { Address } from "src/address/entities/address.entity";
import { ContactPerson } from "src/contact-person/entities/contact-person.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { BankingDetails } from "./bankingDetails.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    clientId: string;
    @Column({
        nullable: false
    })
    companyName: string;
    @OneToMany(() => ContactPerson, cp => cp.contactPersonId)
    contactPerson: ContactPerson[];
    @OneToMany(() => Address, adr => adr.client)
    address: Address[];
    @Column({
        nullable: false
    })
    taxId: string;
    @Column({
        nullable: false
    })
    registrationId: string;
    @OneToOne(() => BankingDetails)
    bankingDetails: BankingDetails;
    @OneToOne(() => ContactPerson)
    legalRepresentative: ContactPerson;
    @OneToMany(() => Invoice, inv => inv.client)
    invoices: Invoice[];
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
