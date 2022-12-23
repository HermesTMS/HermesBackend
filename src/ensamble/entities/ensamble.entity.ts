import { Driver } from "src/driver/entities/driver.entity";
import { Trailer } from "src/trailer/entities/trailer.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ensamble {
    @PrimaryGeneratedColumn('uuid')
    ensambleId: string;
    @OneToOne(() => Driver)
    driver: Driver;
    @OneToOne(() => Trailer)
    trailer: Trailer;
    @OneToOne(() => Vehicle)
    vehicle: Vehicle;
}
