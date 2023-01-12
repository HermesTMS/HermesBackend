import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [PackageController],
  providers: [TenantService, PackageService],
  imports: [TenantModule]
})
export class PackageModule {}
