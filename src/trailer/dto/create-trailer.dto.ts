import { TrailerType } from "../entities/trailerType";

export class CreateTrailerDto {
    vin: string;
    registration: string;
    height: number;
    width: number;
    maxCapacity: number;
    make: string;
    model: string;
    axisNum: string;
    type: TrailerType;
}
