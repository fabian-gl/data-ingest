import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ILocalDbConfig } from './interfaces/mongodb-config.interfaces';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  // The configuration is async because maybe the database credentials come from a service like
  // secret manager, instead of configuring them directly in .env
  // In that case, we would asynchronously fetch them here
  async getConfig(): Promise<MongooseModuleFactoryOptions> {
    let dbConfig = this.configService.get<ILocalDbConfig>('dbConfig')!;

    const formattedConfig: MongooseModuleFactoryOptions = {
      uri: `mongodb://${dbConfig.host}:${dbConfig.port}${dbConfig.extraUri}`,
      dbName: dbConfig.dbName,
      user: dbConfig.username,
      pass: dbConfig.password,
      authSource: 'admin',
      ssl: dbConfig.ssl,
    };

    return formattedConfig;
  }
}
