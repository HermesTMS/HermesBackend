import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/entities/order.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Package);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const pack: Package = await repo.save(createPackageDto);

      const orderRepo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(orderRepo);
      const order: Order = await orderRepo.findOne({
        where: { orderId: createPackageDto.orderId },
        relations: { goods: true }
      });

      order.goods.push(pack);
      return pack;
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Package);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find({ relations: { order: true } });
    });
  }

  async findOne(packageId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Package);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOne({
        where: { packageId },
        relations: { order: true }
      })
    });
  }

  async remove(packageId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Package);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ packageId });
    });
  }
}
