import { Controller, Post } from '@nestjs/common';
import { DataIngestService } from './data-ingest.service';
import { filesInfo } from './input-files';

@Controller('data-ingest')
export class DataIngestController {
  constructor(private readonly dataIngestService: DataIngestService) {}

  @Post()
  async ingestData() {
    for (const { filePath, fileName } of filesInfo) {
      await this.dataIngestService.processFile(filePath, fileName);
    }
    return 'Process complete';
  }
}
