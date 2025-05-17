import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Readable } from 'stream';

import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { DataParser } from './common/parser.type';
import { normalizeLargeData } from './large-data/large-data.parser';
import { normalizeStructuredData } from './structured-data/structured-data.parser';
import { INormalizedData } from './common/normalized-data.types';
import { InjectModel } from '@nestjs/mongoose';
import { NormalizedData } from 'src/persistance/schemas/normalized-data.schema';
import { AnyBulkWriteOperation, Model } from 'mongoose';
import { ProcessError } from 'src/persistance/schemas/errors.schema';

@Injectable()
export class DataIngestService {
  private readonly logger = new Logger(DataIngestService.name);

  private readonly UPSERT_BATCH_SIZE = 1000;
  private normalizedDataBatch: Partial<NormalizedData>[] = [];

  private filePath: string;
  private fileName: string;

  private dataParser?: DataParser;

  constructor(
    private readonly httpService: HttpService,

    @InjectModel(NormalizedData.name)
    private readonly dataModel: Model<NormalizedData>,

    @InjectModel(ProcessError.name)
    private readonly errorModel: Model<ProcessError>,
  ) {}

  private ingestData(stream: Readable) {
    const pipeline = chain([
      stream,
      parser(), // Parses incoming chunks to JSON tokens
      streamArray(), // To parse JSON arrays
    ]);

    return new Promise<void>((resolve, reject) => {
      pipeline.on('data', ({ value }) => {
        this.processObject(value);
      });

      pipeline.on('end', () => {
        this.logger.log('Finished streaming and processing JSON.');
        this.upsertBatch();
        resolve();
      });

      pipeline.on('error', (err) => {
        this.logger.error('Error while processing stream:', err);
        this.upsertBatch();
        reject(err);
      });
    });
  }

  async processFile(filePath: string, fileName: string) {
    // Init process variables
    this.fileName = fileName;
    this.filePath = filePath;

    this.dataParser = undefined;

    const fullPath = `${filePath}${fileName}`;

    const response = await firstValueFrom(this.getFileObservable(fullPath));

    await this.ingestData(response.data);
  }

  private processObject(data: any) {
    if (!this.dataParser) {
      this.selectParser(data);
    }

    const normalizedData = this.dataParser!(data);

    if (normalizedData) {
      this.addToBatch(normalizedData);
    } else {
      this.errorModel
        .create({
          data,
          fileName: this.fileName,
          filePath: this.filePath,
        })
        .then(() => this.logger.error('Error parsing data element, saved log'));
    }
  }

  private addToBatch(normalizedData: INormalizedData) {
    this.normalizedDataBatch.push({
      ...normalizedData,
      fileName: this.fileName,
      filePath: this.filePath,
    });

    if (this.normalizedDataBatch.length >= this.UPSERT_BATCH_SIZE) {
      this.upsertBatch();
    }
  }

  private upsertBatch() {
    if (!this.normalizedDataBatch.length) return;

    const batchData = [...this.normalizedDataBatch];
    this.normalizedDataBatch = [];

    const writeOperation: AnyBulkWriteOperation<NormalizedData>[] =
      batchData.map((data) => {
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

  private selectParser(data: any) {
    // This logic can be as complex as wanted, using duck typing to determine which type of data we are receiving
    // And it is not a big overhead, because it is only decided once for file
    if (typeof data.id === 'string') {
      this.dataParser = normalizeLargeData;
    } else if (typeof data.id === 'number') {
      this.dataParser = normalizeStructuredData;
    } else {
      throw new InternalServerErrorException(
        `Couldn't detect type of parser to use with data ${data}`,
      );
    }
  }

  private getFileObservable(url: string) {
    return this.httpService.get<Readable>(url, { responseType: 'stream' }).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(
          'Fetch error:',
          error.response?.data || error.message,
        );
        throw new Error('An error happened while fetching the file!');
      }),
    );
  }
}
