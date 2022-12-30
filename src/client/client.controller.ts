import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { BankingDetailsDto } from './dto/banking-details.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateBankingDetailsDto } from './dto/update-banking-details.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post()
  createBankingDetails(@Body() bankingDetailsDto: BankingDetailsDto) {

  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get()
  findAllBankingDetails() {

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Get(':id')
  findOneBankingDetails() {

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Patch(':id')
  updateBankingDetails(@Param('id') id: string, @Body() updateBankingDetailsDto: UpdateBankingDetailsDto) {

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }

  @Delete(':id')
  removeBankingDetails(@Param('id') id: string) {

  }
}
