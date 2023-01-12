import { Injectable } from '@nestjs/common';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import { Trailer } from './entities/trailer.entity';

@Injectable()
export class TrailerService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createTrailerDto: CreateTrailerDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(createTrailerDto);
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(registration: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ registration });
    });
  }

  async update(registration: string, updateTrailerDto: UpdateTrailerDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateTrailerDto.registration = registration;
      return await repo.save(updateTrailerDto);
    });
  }

  async remove(registration: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ registration });
    });
  }
}
