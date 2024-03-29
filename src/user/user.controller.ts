import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get('tenanted')
    getAllTenanted(): Promise<User[]> {
        return this.userService.getAllTenanted();
    }

    @Post()
    createOne(@Body() user: User): Promise<User> {
        return this.userService.createOne(user);
    }

    @Post('tenanted')
    createTenanted(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }
}
