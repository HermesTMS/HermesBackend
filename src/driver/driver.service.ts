import { Injectable } from '@nestjs/common';
import { File } from 'src/file/entities/file.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { Connection } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    private tenantService: TenantService,
    private connection: Connection
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(createDriverDto);
    });
  }

  async findAll() {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(driverId: string) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ driverId });
    });
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateDriverDto.driverId = id;
      return await repo.save(updateDriverDto);
    });
  }

  async remove(driverId: string) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ driverId });
    });
  }

  async addDocuments(fileId: string, driverId: string) {
    return await this.connection.transaction(async manager => {
      const fileRepo = manager.getRepository(File);
      await this.tenantService.setCurrentTenantOnRepository(fileRepo);
      const file: File = await fileRepo.findOneBy({ fileId });

      const repo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const driver: Driver = await repo.findOne({
        where: { driverId },
        relations: { documents: true }
      });
      
      driver.documents.push(file);
      return repo.save(driver);
    });
  }
}
