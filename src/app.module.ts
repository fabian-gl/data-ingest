import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, EnvValidationSchema } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigModule, DatabaseConfigService } from './config/database';
import { DataIngestModule } from './data-ingest/data-ingest.module';
import { DataQueryModule } from './data-query/data-query.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DataRepositoryModule } from './data-repository/data-repository.module';

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
    DataIngestModule,
    DataQueryModule,
    ScheduleModule.forRoot(),
    DataRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
