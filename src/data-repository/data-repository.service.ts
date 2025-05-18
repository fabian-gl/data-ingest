import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyBulkWriteOperation, Model } from 'mongoose';
import { DataIngestService } from 'src/data-ingest/data-ingest.service';
import { ProcessError } from 'src/persistance/schemas/errors.schema';
import { NormalizedData } from 'src/persistance/schemas/normalized-data.schema';
import { FindManyDataDto } from './dto/find-many-data.dto';
import { outDataProjection } from './projections/output.data.projection';

@Injectable()
export class DataRepositoryService {
  private readonly logger = new Logger(DataIngestService.name);

  constructor(
    @InjectModel(NormalizedData.name)
    private readonly dataModel: Model<NormalizedData>,

    @InjectModel(ProcessError.name)
    private readonly errorModel: Model<ProcessError>,
  ) {}

  createError(createError: Partial<ProcessError>) {
    this.errorModel
      .create(createError)
      .then(() => this.logger.error('Error parsing data element, saved log'));
  }

  async normalizedDataUpsert(normalizedData: Partial<NormalizedData>[]) {
    const writeOperation: AnyBulkWriteOperation<NormalizedData>[] =
      normalizedData.map((data) => {
        const { id, ...updatableFields } = data;
        return {
          updateOne: {
            filter: { id: data.id },
            update: {
              $set: { ...updatableFields },
            },
            upsert: true,
          },
        };
      });

    this.dataModel
      .bulkWrite(writeOperation, {})
      .then(() => this.logger.debug('Bulk insert success'))
      .catch((error) => this.logger.error(error));
  }

  async findManyDataAndCount(findManyDataDto: FindManyDataDto) {
    const { query, limit, offset } = findManyDataDto;
    const totalQuery = this.dataModel.countDocuments(query);
    const dataQuery = this.dataModel
      .find(query, outDataProjection)
      .sort({ city: 'asc', _id: 'asc' })
      .limit(limit)
      .skip(offset);

    return Promise.all([dataQuery, totalQuery]);
  }
}
