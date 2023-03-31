import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { Tenant } from './tenant/tenant.entity';
import { TenantMiddleware } from './tenant/tenant.middleware';
import { VehicleModule } from './vehicle/vehicle.module';
import { TrailerModule } from './trailer/trailer.module';
import { DriverModule } from './driver/driver.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FileModule } from './file/file.module';
import { ExpenseModule } from './expense/expense.module';
import { EnsambleModule } from './ensamble/ensamble.module';
import { OrderModule } from './order/order.module';
import { NoteModule } from './note/note.module';
import { AddressModule } from './address/address.module';
import { ClientModule } from './client/client.module';
import { PackageModule } from './package/package.module';
import { ContactPersonModule } from './contact-person/contact-person.module';
import { Vehicle } from './vehicle/vehicle.entity';
import { Package } from './package/entities/package.entity';
import { Order } from './order/entities/order.entity';
import { Trailer } from './trailer/entities/trailer.entity';
import { Note } from './note/entities/note.entity';
import { Invoice } from './invoice/entities/invoice.entity';
import { Driver } from './driver/entities/driver.entity';
import { Address } from './address/entities/address.entity';
import { Client } from './client/entities/client.entity';
import { Expense } from './expense/entities/expense.entity';
import { Ensamble } from './ensamble/entities/ensamble.entity';
import { ContactPerson } from './contact-person/entities/contact-person.entity';
import { File } from './file/entities/file.entity';
import { BankingDetails } from './client/entities/bankingDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // username: 'hermestms',
      // password: 'hermestms',
      username: 'postgres',
      password: 'fortuna246',
      database: 'hermes_tms',
      entities: [
        User,
        Tenant,
        Vehicle,
        Package,
        Order,
        Trailer,
        Note,
        File,
        Invoice,
        Driver,
        Address,
        Client,
        Expense,
        Ensamble,
        ContactPerson,
        BankingDetails,
      ],
      synchronize: true,
    }),
    TenantModule,
    UserModule,
    VehicleModule,
    TrailerModule,
    DriverModule,
    InvoiceModule,
    FileModule,
    ExpenseModule,
    EnsambleModule,
    OrderModule,
    NoteModule,
    AddressModule,
    ClientModule,
    PackageModule,
    ContactPersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
