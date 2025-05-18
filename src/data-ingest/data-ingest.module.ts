import { Module } from '@nestjs/common';
import { DataIngestService } from './data-ingest.service';
import { DataIngestController } from './data-ingest.controller';
import { HttpModule } from '@nestjs/axios';
import { CronService } from 'src/cron/cron.service';
import { DataRepositoryModule } from 'src/data-repository/data-repository.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    DataRepositoryModule,
  ],
  controllers: [DataIngestController],
  providers: [DataIngestService, CronService],
})
export class DataIngestModule {}
