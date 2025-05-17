import { Module } from '@nestjs/common';
import { DataIngestService } from './data-ingest.service';
import { DataIngestController } from './data-ingest.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NormalizedData,
  NormalizedDataSchema,
} from 'src/persistance/schemas/normalized-data.schema';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      { name: NormalizedData.name, schema: NormalizedDataSchema },
    ]),
  ],
  controllers: [DataIngestController],
  providers: [DataIngestService],
})
export class DataIngestModule {}
