import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/entities/order.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    private dataSource: DataSource,
    private tenantService: TenantService
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    return await this.dataSource.transaction(async manager => {
      const userRepo = manager.getRepository(User);
      await this.tenantService.setCurrentTenantOnRepository(userRepo);
      const user: User = await userRepo.findOneBy({ id: createNoteDto.creatorId });

      const orderRepo = manager.getRepository(Order);
      await this.tenantService.setCurrentTenantOnRepository(orderRepo);
      const order: Order = await orderRepo.findOneBy({ orderId: createNoteDto.orderId });

      const repo = manager.getRepository(Note);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      const note: Note = await repo.save(createNoteDto);
      note.creator = user;
      note.order = order;
      return note;
    });
  }

  async findAll() {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Note);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.find();
    });
  }

  async findOne(noteId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Note);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.findOneBy({ noteId });
    });
  }

  async update(noteId: string, updateNoteDto: UpdateNoteDto) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Note);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      updateNoteDto.noteId = noteId;
      return await repo.save(updateNoteDto);
    });
  }

  async remove(noteId: string) {
    return await this.dataSource.transaction(async manager => {
      const repo = manager.getRepository(Note);
      await this.tenantService.setCurrentTenantOnRepository(repo);
      return await repo.delete({ noteId });
    });
  }
}
