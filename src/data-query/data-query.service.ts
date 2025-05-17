import { Injectable } from '@nestjs/common';
import { FilterDataDto } from './dto/filter-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { NormalizedData } from 'src/persistance/schemas/normalized-data.schema';
import { outDataProjection } from './projections/output.data.projection';
import { getRangeFilter } from 'src/utils/range-filter';

@Injectable()
export class DataQueryService {
  constructor(
    @InjectModel(NormalizedData.name)
    private readonly dataModel: Model<NormalizedData>,
  ) {}
  async filterData(filterDataDto: FilterDataDto) {
    const { limit, offset } = filterDataDto;

    const query = this.getFilterQuery(filterDataDto);

    const totalQuery = this.dataModel.countDocuments(query);
    const dataQuery = this.dataModel
      .find(query, outDataProjection)
      .sort({ city: 'asc', _id: 'asc' })
      .limit(limit)
      .skip(offset);

    const [data, total] = await Promise.all([dataQuery, totalQuery]);

    return {
      data,
      limit,
      offset,
      total,
    };
  }

  private getFilterQuery(
    filterDataDto: FilterDataDto,
  ): RootFilterQuery<NormalizedData> {
    const { name, pricePerNightFrom, pricePerNightTo } = filterDataDto;
    const query: RootFilterQuery<NormalizedData> = {};

    const onlyExactMatch: (keyof NormalizedData)[] = [
      'id',
      'isAvailable',
      'city',
      'country',
      'priceSegment',
    ];

    for (const exactMatchProp of onlyExactMatch) {
      if (filterDataDto[exactMatchProp] !== undefined) {
        query[exactMatchProp] = filterDataDto[exactMatchProp];
      }
    }

    // Filter by price range
    const priceFilter = getRangeFilter<number>(
      pricePerNightFrom,
      pricePerNightTo,
    );
    if (priceFilter) query.pricePerNight = priceFilter;

    if (name) {
      query.$text = { $search: name };
    }

    return query;
  }
}
