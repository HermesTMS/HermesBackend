import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enable } from 'async-local-storage';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  enable();
  await app.listen(3000);
  Logger.log(`Running on port 3000`)
}
bootstrap();
