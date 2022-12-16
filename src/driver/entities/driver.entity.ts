import { User } from "src/user/user.entity";
import { Column, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DrivingCategories } from "./drivingCategories";
import { File } from "src/file/entities/file.entity";

export class Driver {
    @PrimaryGeneratedColumn('uuid')
    driverId: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    drivingCategories: DrivingCategories[];

    // relations
    @Column()
    @OneToOne(() =>  User)
    @JoinColumn()
    userProfile: User;
    @Column()
    @OneToMany(() => File, file => file.ownerUuid)
    documents: File[];
}
