import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
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
    @Column({
        type: 'text',
        default: () => "current_setting('hermestms.current_tenant')::text",
        nullable: false
    })
    tenantId: string;
}
