import { Module } from '@nestjs/common';
import { DataQueryService } from './data-query.service';
import { DataQueryController } from './data-query.controller';
import { DataRepositoryModule } from 'src/data-repository/data-repository.module';

@Module({
  imports: [DataRepositoryModule],
  controllers: [DataQueryController],
  providers: [DataQueryService],
})
export class DataQueryModule {}
