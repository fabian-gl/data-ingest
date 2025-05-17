import { Controller, Post } from '@nestjs/common';
import { DataIngestService } from './data-ingest.service';

@Controller('data-ingest')
export class DataIngestController {
  constructor(private readonly dataIngestService: DataIngestService) {}

  @Post()
  ingestData() {
    const s3BaseUrl =
      'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/';

    const exampleFile = 'structured_generated_data.json';
    // const exampleFile = 'large_generated_data.json';

    return this.dataIngestService.processFile(s3BaseUrl, exampleFile);
  }
}
