import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}