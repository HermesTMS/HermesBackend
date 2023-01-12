import { Injectable } from '@nestjs/common';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Expense);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(createExpenseDto);
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Expense);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(expenseId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Expense);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ expenseId });
    });
  }

  async update(expenseId: string, updateExpenseDto: UpdateExpenseDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Expense);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateExpenseDto.expenseId = expenseId;
      return await repo.save(updateExpenseDto);
    });
  }

  async remove(expenseId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Expense);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ expenseId });
    });
  }
}
