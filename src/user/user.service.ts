import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/tenant/tenant.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private tenantService: TenantService,
        private connection: Connection
    ) {}

    async getAllTenanted(): Promise<User[]> {
        return await this.connection.transaction(async manager => {
            const repo = manager.getRepository(User);
            await this.tenantService.setCurrentTenantOnRepository(repo);

            return repo.find();
        });
    }

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    createOne(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async create(user: User): Promise<User> {
        return await this.connection.transaction(async (manager) => {
            const repo = manager.getRepository(User);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.save(user);
        })
    }
}
