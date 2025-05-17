import { Controller, Post } from '@nestjs/common';
import { DataIngestService } from './data-ingest.service';

@Controller('data-ingest')
export class DataIngestController {
  constructor(private readonly dataIngestService: DataIngestService) {}

  @Post()
  ingestData() {
    return this.dataIngestService.ingestData();
  }
}
