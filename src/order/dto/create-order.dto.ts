import { User } from "src/user/user.entity";
import { OrderStatus } from "../entities/orderStatus";

export class CreateOrderDto {
    creatorId: string;
    creator: User;
    startTime: Date;
    endTime: Date;
    priceKm: number;
    description: string;
    status: OrderStatus;
}
