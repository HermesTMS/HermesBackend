import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [AddressController],
  providers: [TenantService, AddressService],
  imports: [TenantModule]
})
export class AddressModule {}
