import { RootFilterQuery } from 'mongoose';
import { NormalizedData } from 'src/persistance/schemas/normalized-data.schema';

export class FindManyDataDto {
  query: RootFilterQuery<NormalizedData>;
  limit: number;
  offset: number;
}
