import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./user.type";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    position: string;
    type: UserType;
}