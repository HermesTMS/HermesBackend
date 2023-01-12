import { DrivingCategories } from "../entities/drivingCategories";
import { File } from "src/file/entities/file.entity";
export class CreateDriverDto {
    firstName: string;
    lastName: string;
    drivingCategories: DrivingCategories[];
}
