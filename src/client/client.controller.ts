import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankingDetailsService } from './banking-details.service';
import { ClientService } from './client.service';
import { BankingDetailsDto } from './dto/banking-details.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateBankingDetailsDto } from './dto/update-banking-details.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly bankingDetailsService: BankingDetailsService  
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post('banking')
  createBankingDetails(@Body() bankingDetailsDto: BankingDetailsDto) {
    return this.bankingDetailsService.create(bankingDetailsDto);
  }

  @Post('address/:addressId')
  assignAddressToClient(@Param('addressId') addressId: string, @Body() client: Client) {
    return this.clientService.addAddress(client.clientId, addressId);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('banking')
  findAllBankingDetails() {
    return this.bankingDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Get('banking/:id')
  findOneBankingDetails(@Param('id') id: string) {
    return this.bankingDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Patch('banking/:id')
  updateBankingDetails(@Param('id') id: string, @Body() updateBankingDetailsDto: UpdateBankingDetailsDto) {
    return this.bankingDetailsService.update(id, updateBankingDetailsDto);
  }

  @Post('banking/:id')
  addBankingDetails(@Param('id') id: string, @Body() clientId: string) {
    return this.bankingDetailsService.addToClient(id, clientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }

  @Delete('banking/:id')
  removeBankingDetails(@Param('id') id: string) {
    return this.bankingDetailsService.remove(id);
  }
}
