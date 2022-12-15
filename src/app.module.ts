import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { Tenant } from './tenant/tenant.entity';
import { TenantMiddleware } from './tenant/tenant.middleware';

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
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(TenantMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
