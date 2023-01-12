import { Injectable } from "@nestjs/common";
import { TenantService } from "src/tenant/tenant.service";
import { Connection, Repository } from "typeorm";
import { BankingDetailsDto } from "./dto/banking-details.dto";
import { UpdateBankingDetailsDto } from "./dto/update-banking-details.dto";
import { BankingDetails } from "./entities/bankingDetails.entity";
import { Client } from "./entities/client.entity";

@Injectable()
export class BankingDetailsService {
    async addToClient(id: string, clientId: string) {
      return await this.connection.transaction(async manager => {
        const repo = manager.getRepository(Client);
        const bankingRepo = manager.getRepository(BankingDetails);
        await this.tenantService.setCurrentTenantOnRepository(repo);
        const client: Client = await repo.findOne({
            where: { clientId }
        });
        const bankingDetails: BankingDetails = await bankingRepo.findOneBy({ id });
        client.bankingDetails = bankingDetails;
        return repo.save(client);
      });
    }
    constructor(
        private tenantService: TenantService,
        private connection: Connection
    ) {}

    async findAll(): Promise<BankingDetails[]> {
        return await this.connection.transaction(async manager => {
            const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.find();
        });
    }

    async findOne(id: string): Promise<BankingDetails> {
        return await this.connection.transaction(async manager => {
            const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.findOneBy({ id });
        });
    }

    async create(bankingDetails: BankingDetailsDto): Promise<BankingDetails> {
        return await this.connection.transaction(async manager => {
            const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return repo.save(bankingDetails);
        });
    }

    async update(id: string, updateBankingDetailsDto: UpdateBankingDetailsDto): Promise<BankingDetails> {
        return await this.connection.transaction(async manager => {
           const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
           await this.tenantService.setCurrentTenantOnRepository(repo);
           updateBankingDetailsDto.id = id;
           return repo.save(updateBankingDetailsDto);
        });
    }

    async remove(id: string): Promise<Boolean> {
        return await this.connection.transaction(async manager => {
            const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            const del = repo.delete({ id });
        
            if (del) {
                return true;
            } else {
                return false;
            }
        });
    }
}