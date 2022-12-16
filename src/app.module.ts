import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hermestms',
      password: 'hermestms',
      database: 'hermes_tms',
      entities: [User, Tenant],
      // synchronize: true
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
    ContactPersonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(TenantMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
