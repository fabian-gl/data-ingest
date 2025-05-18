import { Module } from '@nestjs/common';
import { DataRepositoryService } from './data-repository.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProcessError,
  ProcessErrorSchema,
} from 'src/persistance/schemas/errors.schema';
import {
  NormalizedData,
  NormalizedDataSchema,
} from 'src/persistance/schemas/normalized-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NormalizedData.name, schema: NormalizedDataSchema },
      { name: ProcessError.name, schema: ProcessErrorSchema },
    ]),
  ],
  providers: [DataRepositoryService],
  exports: [DataRepositoryService],
})
export class DataRepositoryModule {}
