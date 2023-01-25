import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  controllers: [OrderController],
  providers: [TenantService, OrderService],
  imports: [TenantModule]
})
export class OrderModule {}
