import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, EnvValidationSchema } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule, DatabaseConfigService } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.getConfig(),
      inject: [DatabaseConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
