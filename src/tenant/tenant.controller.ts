import { Controller, Get, Post, Body } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {
    constructor(private tenantService: TenantService) {}

    @Get()
    getAll(): Promise<Tenant[]> {
        return this.tenantService.getAll();
    }

    @Post()
    createOne(@Body() tenant: Tenant): Promise<Tenant> {
        return this.tenantService.createOne(tenant);
    }
}
