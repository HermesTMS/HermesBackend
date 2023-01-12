import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { Client } from 'src/client/entities/client.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { Connection } from 'typeorm';
import { CreateContactPersonDto } from './dto/create-contact-person.dto';
import { UpdateContactPersonDto } from './dto/update-contact-person.dto';
import { ContactPerson } from './entities/contact-person.entity';

@Injectable()
export class ContactPersonService {
  constructor(
    private tenantService: TenantService,
    private connection: Connection
  )  {}

  async create(createContactPersonDto: CreateContactPersonDto,) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.save(createContactPersonDto);
    });
  }

  async findAll() {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(id: string) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ contactPersonId: id });
    });
  }

  async update(id: string, updateContactPersonDto: UpdateContactPersonDto) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateContactPersonDto.contactPersonId = id;
      return await repo.save(updateContactPersonDto);
    })
  }

  async remove(id: string) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return repo.delete({ contactPersonId: id });
    }); 
  }

  async addContactPersonToClient(id: string, clientId: string, isLegalRep: boolean) {
    return await this.connection.transaction(async manager => {
      const repo = manager.getRepository(ContactPerson);
      const clientRepo = manager.getRepository(Client);
      await this.tenantService.setCurrentTenantOnRepository(clientRepo);
      const client = await clientRepo.findOne({ 
        where: { clientId },
        relations: {
          contactPerson: true,
          legalRepresentative: true
        }
      });
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const contactPerson = await repo.findOneBy({ contactPersonId: id });
      if (isLegalRep) {
        client.legalRepresentative = contactPerson;
      } else {
        client.contactPerson.push(contactPerson);
      }
      return await clientRepo.save(client);
    });
  }
}
