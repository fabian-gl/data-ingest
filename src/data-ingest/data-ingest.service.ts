import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Readable } from 'stream';

import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

const s3BaseUrl =
  'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/';
const exampleFile = 'structured_generated_data.json';
// const exampleFile = 'large_generated_data.json';

@Injectable()
export class DataIngestService {
  private readonly logger = new Logger(DataIngestService.name);
  constructor(private readonly httpService: HttpService) {}

  async ingestData() {
    const fullUrl = `${s3BaseUrl}${exampleFile}`;
    const response = await firstValueFrom(this.fetchData(fullUrl));
    const stream = response.data as Readable;

    const pipeline = chain([
      stream,
      parser(), // Parses incoming chunks to JSON tokens
      streamArray(), // To parse JSON arrays
    ]);

    pipeline.on('data', ({ value }) => {
      this.processObject(value); // value is the parsed object
    });

    pipeline.on('end', () => {
      this.logger.log('Finished streaming and processing JSON.');
    });

    pipeline.on('error', (err) => {
      this.logger.error('Error while processing stream:', err);
    });
  }

  private processObject(obj: any) {
    this.logger.debug(`Processing object with ID: ${obj.id}`);
    console.log(obj);
  }

  private fetchData(url: string) {
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
