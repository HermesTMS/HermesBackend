import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { BankingDetailsService } from './banking-details.service';
import { AddressService } from 'src/address/address.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, TenantService, AddressService, BankingDetailsService],
  imports: [TenantModule]
})
export class ClientModule {}
