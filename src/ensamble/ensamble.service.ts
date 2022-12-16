import { Injectable } from '@nestjs/common';
import { CreateEnsambleDto } from './dto/create-ensamble.dto';
import { UpdateEnsambleDto } from './dto/update-ensamble.dto';

@Injectable()
export class EnsambleService {
  create(createEnsambleDto: CreateEnsambleDto) {
    return 'This action adds a new ensamble';
  }

  findAll() {
    return `This action returns all ensamble`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ensamble`;
  }

  update(id: number, updateEnsambleDto: UpdateEnsambleDto) {
    return `This action updates a #${id} ensamble`;
  }

  remove(id: number) {
    return `This action removes a #${id} ensamble`;
  }
}
