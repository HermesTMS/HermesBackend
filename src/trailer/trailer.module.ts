import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  controllers: [TrailerController],
  providers: [TenantService, TrailerService],
  imports: [TenantModule]
})
export class TrailerModule {}
