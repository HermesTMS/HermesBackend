import { Injectable } from '@nestjs/common';
import { TenantService } from 'src/tenant/tenant.service';
import { Connection, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private tenantService: TenantService,
    private connection: Connection
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Address> = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.save(createAddressDto);
    });
  }

  async findAll(): Promise<Address[]> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Address> = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.find();
    });
  }

  async findOne(id: string): Promise<Address> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Address> = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.findOneBy({ id });
    });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Address> = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateAddressDto.id = id;
      return repo.save(updateAddressDto);
    });
  }

  async remove(id: string): Promise<Boolean> {
    return await this.connection.transaction(async manager => {
      const repo: Repository<Address> = manager.getRepository(Address);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const deleted = await repo.delete({ id });

      if (deleted) {
        return true;
      } else {
        return false;
      }
    });
  }
}
