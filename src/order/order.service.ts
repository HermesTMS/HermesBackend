import { Injectable } from '@nestjs/common';
import { Ensamble } from 'src/ensamble/entities/ensamble.entity';
import { File } from 'src/file/entities/file.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.dataSource.transaction(async manager => {
      const userRepo = manager.getRepository(User);
      await this.tenantService.setCurrentTenantOnRepository(userRepo);
      const user: User = await userRepo.findOne({
        where: { id: createOrderDto.creatorId }
      });
      createOrderDto.creator = user;
      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(createOrderDto);
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(orderId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOne({
        where: { orderId },
        relations: {
          invoices: true,
          files: true,
          notes: true,
          ensamble: true,
          goods: true,
          expenses: true,
          loadings: true,
          unloadings: true,
          sender: true,
          receiver: true
        }
      });
    });
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateOrderDto.orderId = orderId;
      return await repo.save(updateOrderDto);
    });
  }

  async remove(orderId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ orderId });
    });
  }

  async addInvoice(orderId: string, invoiceNumber: string) {
    return await this.dataSource.transaction(async manager => {
      const invoiceRepo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(invoiceRepo);
      const invoice: Invoice = await invoiceRepo.findOne({ where: { invoiceNumber }});

      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const order: Order = await repo.findOne({ 
        where: { orderId },
        relations: { invoices: true }
      });
      order.invoices.push(invoice);
      return await repo.save(order);
    });
  }

  async addFile(orderId: string, fileId: string) {
    return await this.dataSource.transaction(async manager => {
      const fileRepo = manager.getRepository(File);
      await this.tenantService.setCurrentTenantOnRepository(fileRepo);
      const file: File = await fileRepo.findOne({ where: { fileId }});

      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const order: Order = await repo.findOne({ 
        where: { orderId },
        relations: { files: true }
      });
      order.files.push(file);
      return await repo.save(order);
    });
  }

  async addEnsamble(orderId: string, ensambleId: string) {
    return await this.dataSource.transaction(async manager => {
      const ensambleRepo = manager.getRepository(Ensamble);
      await this.tenantService.setCurrentTenantOnRepository(ensambleRepo);
      const ensamble: Ensamble = await ensambleRepo.findOne({ where: { ensambleId }});

      const repo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const order: Order = await repo.findOne({ 
        where: { orderId },
        relations: { ensamble: true }
      });
      order.ensamble = ensamble;
      return await repo.save(order);
    });
  }
}
