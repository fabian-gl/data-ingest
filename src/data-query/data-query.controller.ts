import { Controller, Post, Body } from '@nestjs/common';
import { DataQueryService } from './data-query.service';
import { FilterDataDto } from './dto/filter-data.dto';
import { ApiResponse } from '@nestjs/swagger';
import { FilterDataResponseDto } from './dto/filter-data.response.dto';

@Controller('data-query')
export class DataQueryController {
  constructor(private readonly dataQueryService: DataQueryService) {}

  @ApiResponse({
    description: 'The filtered data',
    type: FilterDataResponseDto,
  })
  @Post()
  filterData(@Body() filterDataDto: FilterDataDto) {
    return this.dataQueryService.filterData(filterDataDto);
  }
}
