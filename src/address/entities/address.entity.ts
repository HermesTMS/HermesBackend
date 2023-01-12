import { Client } from "src/client/entities/client.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        nullable: false
    })
    address: string;
    @Column()
    postCode: string;
    @Column({
        nullable: false
    })
    country: string;
    @Column()
    region: string;
    @Column()
    coordinates: string;
    @Column()
    dock: string;
    @Column()
    sector: string;
    @Column()
    description: string;
    @ManyToOne(() => Client, client => client.address)
    client: Client;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
