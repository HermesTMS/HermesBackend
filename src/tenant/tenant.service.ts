import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
    constructor(@InjectRepository(Tenant) private tenantRepository: Repository<Tenant>) {}

    getAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    createOne(tenant: Tenant): Promise<Tenant> {
        return this.tenantRepository.save(tenant);
    }
}
