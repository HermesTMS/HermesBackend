import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnsambleService } from './ensamble.service';
import { CreateEnsambleDto } from './dto/create-ensamble.dto';
import { UpdateEnsambleDto } from './dto/update-ensamble.dto';

@Controller('ensamble')
export class EnsambleController {
  constructor(private readonly ensambleService: EnsambleService) {}

  @Post()
  create(@Body() createEnsambleDto: CreateEnsambleDto) {
    return this.ensambleService.create(createEnsambleDto);
  }

  @Get()
  findAll() {
    return this.ensambleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ensambleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnsambleDto: UpdateEnsambleDto) {
    return this.ensambleService.update(+id, updateEnsambleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ensambleService.remove(+id);
  }
}
