import { Column, Entity, PrimaryColumn } from "typeorm";
import { TrailerType } from "./trailerType";

@Entity('trailers')
export class Trailer {
    @PrimaryColumn()
    vin: string;
    @Column({
        unique: true
    })
    registration: string;
    @Column()
    height: number;
    @Column()
    width: number;
    @Column()
    maxCapacity: number;
    @Column()
    make: string;
    @Column()
    model: string;
    @Column()
    axisNum: string;
    @Column()
    type: TrailerType;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
