import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  controllers: [NoteController],
  providers: [TenantService, NoteService],
  imports: [TenantModule]
})
export class NoteModule {}
