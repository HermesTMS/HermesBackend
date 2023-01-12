import { PartialType } from '@nestjs/mapped-types';
import { CreateEnsambleDto } from './create-ensamble.dto';

export class UpdateEnsambleDto extends PartialType(CreateEnsambleDto) {
    ensambleId: string
}
