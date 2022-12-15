import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { get } from 'async-local-storage';

@Injectable()
export class TenantService {
    private tenants: Object = {};

    constructor(@InjectRepository(Tenant) private tenantRepository: Repository<Tenant>) {
        // this.initTenants();
        // console.log(this.tenants);
    }

    private async initTenants(): Promise<void> {
        try {
            const tenants: Tenant[] = await this.tenantRepository.find();
            console.log(tenants);
            for (const tenant of tenants) {
                this.tenants[tenant.companyName] = tenant;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getTenantFromNamespace(): Promise<Tenant> {
        const tenantName: string = await get('tenant');
        return this.getTenantByName(tenantName); 
    }

    getAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    createOne(tenant: Tenant): Promise<Tenant> {
        return this.tenantRepository.save(tenant);
    }

    getTenantByName(companyName: string): Promise<Tenant> {
        if (this.tenants[companyName]) {
            console.log(this.tenants[companyName])
            return this.tenants[companyName]
        } else if (!this.tenants[companyName]) {
            const tenant: Promise<Tenant> = this.tenantRepository.findOneBy({
                companyName
            });
            this.tenants[companyName] = tenant;
            return tenant;
        } else {
            console.log('return null')
            return null;
        }
    }

    findById(id: string): Promise<Tenant> {
        return this.tenantRepository.findOneBy({
            id
        });
    }

    async setCurrentTenantOnRepository<T>(repository: Repository<T>): Promise<void> {
        const tenanteName: string = (await this.getTenantFromNamespace()).companyName;
        console.log(tenanteName);
        const r = await repository.query(
            `SET LOCAL hermestms.current_tenant='${tenanteName}'`,
            []
        );
        console.log('after set repo', r);
    }

    public async setCurrentTenantOnQueryRunner(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`SET LOCAL hermestms.current_tenant='${(await this.getTenantFromNamespace()).companyName}'`, []);
    } 
}
