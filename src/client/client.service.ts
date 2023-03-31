import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TenantService } from 'src/tenant/tenant.service';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class ClientService {
  constructor(
    private tenantService: TenantService,
    private connection: Connection,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.save(createClientDto);
    });
  }

  async findAll(): Promise<Client[]> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.find({
        relations: {
          address: true,
        },
      });
    });
  }

  async findOne(id: string): Promise<Client> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.findOneBy({ clientId: id });
    });
  }

  async update(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return await this.connection.transaction(async (manager) => {
      const repo: Repository<Client> = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateClientDto.clientId = clientId;
      return repo.save(updateClientDto);
    });
  }

  async remove(clientId: string): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.delete({ clientId });
    });
  }

  async addAddress(clientId: string, addressId: string): Promise<Client> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Client);
      const addressRepo = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const client: Client = await repo.findOne({
        where: { clientId },
        relations: { address: true },
      });
      const address: Address = await addressRepo.findOneBy({ id: addressId });
      client.address.push(address);
      return repo.save(client);
    });
  }
}
