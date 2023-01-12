import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  controllers: [ExpenseController],
  providers: [TenantService, ExpenseService],
  imports: [TenantModule]
})
export class ExpenseModule {}
