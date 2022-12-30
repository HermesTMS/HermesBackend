import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm'
import { TenantService } from 'src/tenant/tenant.service';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private tenantService: TenantService,
    private connection: Connection  
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // return await this.connection.transaction(async manager => {
    //   const repo = manager.getRepository(Client);
    //   await this.tenantService.setCurrentTenantOnRepository(repo);
    //   return repo.save(createClientDto);
    // });

    return await this.tenantWrapper(repo => {
      repo.save(createClientDto);
    });
  }

  async findAll(): Promise<Client[]> {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.find();
    });
  }

  async findOne(id: string): Promise<Client> {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.findOneBy({ clientId: id });
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    return await this.tenantWrapper(repo => {
      return repo.update({
        clientId: id
      }, {
        ...updateClientDto
      });
    })
  }

  async remove(id: string): Promise<void> {
    await this.tenantWrapper(repo => {
      repo.delete({ clientId: id });
    });
  }

  private async tenantWrapper(cb: Function): Promise<Client> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Client> = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return cb(repo);
    });
  }
}
