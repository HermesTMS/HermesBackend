import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class File {
    @Column()
    @ManyToOne()
    ownerUuid: string;
}
