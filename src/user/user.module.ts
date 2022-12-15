import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  providers: [UserService, TenantService],
  controllers: [UserController],
  imports: [TenantModule, TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule]
})
export class UserModule {}
