import { Module } from '@nestjs/common';
import { EnsambleService } from './ensamble.service';
import { EnsambleController } from './ensamble.controller';

@Module({
  controllers: [EnsambleController],
  providers: [EnsambleService]
})
export class EnsambleModule {}
