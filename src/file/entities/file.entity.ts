import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    fileId: string;
    @Column({
        nullable: false
    })
    fileSize: string;
    @Column({
        nullable: false
    })
    fileName: string;
    @Column({
        nullable: false
    })
    fileLocation: string;
    @Column({
        nullable: false
    })
    ownerUuid: string;
}
