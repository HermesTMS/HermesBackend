import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  controllers: [DriverController],
  providers: [TenantService, DriverService],
  imports: [TenantModule]
})
export class DriverModule {}
