import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [InvoiceController],
  providers: [TenantService, InvoiceService],
  imports: [TenantModule]
})
export class InvoiceModule {}
