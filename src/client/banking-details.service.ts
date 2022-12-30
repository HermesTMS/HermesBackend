import { Injectable } from "@nestjs/common";
import { TenantService } from "src/tenant/tenant.service";
import { Connection, Repository } from "typeorm";
import { BankingDetails } from "./entities/bankingDetails.entity";

@Injectable()
export class BankingDetailsService {
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

    private async tenantedWrapper(cb: Function): Promise<BankingDetails> {
        return await this.connection.transaction(async manager => {
            const repo: Repository<BankingDetails> = manager.getRepository(BankingDetails);
            await this.tenantService.setCurrentTenantOnRepository(repo);
            return cb(repo);
        });
    }
}