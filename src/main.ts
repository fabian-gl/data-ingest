import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config';

async function bootstrap() {
  const logger = new Logger('Main bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  const configService = app.get<ConfigService>(ConfigService);

  const { port = 3000 } = configService.get<IAppConfig>('appConfig')!;

  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: false });

  await app.listen(port);
  logger.debug(`App running on port ${port}`);
}
bootstrap();
