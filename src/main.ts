import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main bootstrap');

  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  logger.debug(`App running on port ${port}`);
}
bootstrap();
