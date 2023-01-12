import { Module } from '@nestjs/common';
import { EnsambleService } from './ensamble.service';
import { EnsambleController } from './ensamble.controller';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  controllers: [EnsambleController],
  providers: [TenantService, EnsambleService],
  imports: [TenantModule]
})
export class EnsambleModule {}
