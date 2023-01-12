import { Injectable } from '@nestjs/common';
import { TenantService } from 'src/tenant/tenant.service';
import { Connection, DataSource } from 'typeorm';
import { CreateEnsambleDto } from './dto/create-ensamble.dto';
import { UpdateEnsambleDto } from './dto/update-ensamble.dto';
import { Ensamble } from './entities/ensamble.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Injectable()
export class EnsambleService {
  constructor(
    private tenantService: TenantService,
    private dataSource: DataSource
  ) {}

  async create(createEnsambleDto: CreateEnsambleDto) {
    return await this.dataSource.transaction(async manager => {
      const vehicleRepo = manager.getRepository(Vehicle);
      await this.tenantService.setCurrentTenantOnRepository(vehicleRepo);
      const vehicle: Vehicle = await vehicleRepo.findOneBy({ registration: createEnsambleDto.vehicleRegistration });

      const trailerRepo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(trailerRepo);
      const trailer: Trailer = await trailerRepo.findOneBy({ registration: createEnsambleDto.trailerRegistration });

      const driverRepo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(driverRepo);
      const driver: Driver = await driverRepo.findOneBy({ driverId: createEnsambleDto.driverId });

      const ensamble: Ensamble = new Ensamble();
      ensamble.driver = driver;
      ensamble.trailer = trailer;
      ensamble.vehicle = vehicle;

      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(ensamble);
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(ensambleId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ ensambleId });
    });
  }

  async update(ensambleId: string, updateEnsambleDto: UpdateEnsambleDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateEnsambleDto.ensambleId = ensambleId;
      return await repo.save(updateEnsambleDto);
    });
  }

  async remove(ensambleId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ ensambleId });
    });
  }

  async changeDriver(ensambleId: string, driverId: string) {
    return await this.dataSource.transaction(async manager => {
      const driverRepo = manager.getRepository(Driver);
      await this.tenantService.setCurrentTenantOnRepository(driverRepo);
      const driver = await driverRepo.findOneBy({ driverId });

      
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const ensamble = await repo.findOne({
        where: { ensambleId },
        relations: { driver: true }
      });

      ensamble.driver = driver;
      return await repo.save(ensamble);
    });
  }

  async addTrailer(ensambleId: string, registration: string) {
    return await this.dataSource.transaction(async manager => {
      const trailerRepo = manager.getRepository(Trailer);
      await this.tenantService.setCurrentTenantOnRepository(trailerRepo);
      const trailer = await trailerRepo.findOneBy({ registration });

      
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const ensamble = await repo.findOne({
        where: { ensambleId },
        relations: { trailer: true }
      });

      ensamble.trailer = trailer;
      return await repo.save(ensamble);
    });
  }

  async addVehicle(ensambleId: string, registration: string) {
    return await this.dataSource.transaction(async manager => {
      const vehicleRepo = manager.getRepository(Vehicle);
      await this.tenantService.setCurrentTenantOnRepository(vehicleRepo);
      const vehicle = await vehicleRepo.findOneBy({ registration });

      
      const repo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const ensamble = await repo.findOne({
        where: { ensambleId },
        relations: { vehicle: true }
      });

      ensamble.vehicle = vehicle;
      return await repo.save(ensamble);
    });
  }
}
