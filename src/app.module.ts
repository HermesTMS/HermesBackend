import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { Tenant } from './tenant/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'fortuna246',
      database: 'hermes_tms',
      entities: [User, Tenant],
      synchronize: false
    }),
    TenantModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
