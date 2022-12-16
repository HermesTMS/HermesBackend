import { Module } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { ContactPersonController } from './contact-person.controller';

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonService]
})
export class ContactPersonModule {}
