import { Module } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { ContactPersonController } from './contact-person.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';
import { ClientService } from 'src/client/client.service';

@Module({
  controllers: [ContactPersonController],
  providers: [TenantService, ClientService, ContactPersonService],
  imports: [TenantModule]
})
export class ContactPersonModule {}
