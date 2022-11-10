import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  imports: [TypeOrmModule.forFeature([Tenant])],
  exports: [TypeOrmModule]
})
export class TenantModule {}
