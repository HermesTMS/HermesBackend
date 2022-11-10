import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    createOne(@Body() user: User): Promise<User> {
        return this.usersService.createOne(user);
    }
}