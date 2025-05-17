import { Module } from '@nestjs/common';
import { DataQueryService } from './data-query.service';
import { DataQueryController } from './data-query.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NormalizedData,
  NormalizedDataSchema,
} from 'src/persistance/schemas/normalized-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NormalizedData.name, schema: NormalizedDataSchema },
    ]),
  ],
  controllers: [DataQueryController],
  providers: [DataQueryService],
})
export class DataQueryModule {}
