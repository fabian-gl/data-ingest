import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());

  const docConfig = new DocumentBuilder()
    .setTitle('Ingest data')
    .setDescription(
      'Api to ingest data from properties and query the information',
    )
    .setVersion('v1')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, docConfig, {});
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  const { port = 3000 } = configService.get<IAppConfig>('appConfig')!;

  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: false });

  await app.listen(port);
  logger.debug(`App running on port ${port}`);
}
bootstrap();
