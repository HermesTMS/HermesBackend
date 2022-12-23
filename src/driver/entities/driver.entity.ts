import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DrivingCategories } from "./drivingCategories";
import { File } from "src/file/entities/file.entity";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    driverId: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column('simple-array', { nullable: false })
    drivingCategories: DrivingCategories[];
    // relations
    @OneToOne(() =>  User)
    userProfile: User;
    @OneToMany(() => File, file => file.ownerUuid)
    documents: File[];
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
