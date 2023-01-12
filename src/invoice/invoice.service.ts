import { Injectable } from '@nestjs/common';
import { Client } from 'src/client/entities/client.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { clientId } = createInvoiceDto;

    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const invoice = await repo.save(createInvoiceDto);

      const clientRepo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(clientRepo);
      const client: Client = await clientRepo.findOne({
        where: { clientId },
        relations: { invoices: true }
      })

      client.invoices.push(invoice);
      clientRepo.save(client);

      return invoice;
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(invoiceNumber: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ invoiceNumber });
    });
  }

  async update(invoiceNumber: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateInvoiceDto.invoiceNumber = invoiceNumber;
      return await repo.findOneBy({ invoiceNumber });
    });
  }

  async remove(invoiceNumber: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Invoice);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ invoiceNumber });
    });;
  }
}
