import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataIngestService } from 'src/data-ingest/data-ingest.service';
import { filesInfo } from 'src/data-ingest/input-files';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly dataIngestService: DataIngestService) {}

  @Cron('0 0 * * *')
  async runCron() {
    for (const { filePath, fileName } of filesInfo) {
      await this.dataIngestService.processFile(filePath, fileName);
    }
    this.logger.debug('Called when the current second is 45');
  }
}
