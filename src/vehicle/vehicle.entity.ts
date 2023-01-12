import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FuelType } from "./fuelType";

@Entity('vehicles')
export class Vehicle {
    @PrimaryColumn()
    vin: string;
    @Column({ unique: true })
    registration: string;
    @Column()
    make: string;
    @Column()
    model: string;
    @Column()
    year: Date;
    @Column()
    mileage: number;
    @Column()
    engineCapacity: number;
    @Column()
    fuelType: FuelType;
    @Column()
    fuelCapacity: number;
    @Column()
    adBlueCapacity: number;
    @Column()
    maxWeight: number;
    @Column()
    axisNum: number;
    @Column()
    trunkHeight: number;
    @Column()
    trunkWidth: number;
    @Column()
    trunkLiters: number;
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
