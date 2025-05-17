import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FilterDataDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by data id',
    example: '235950',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    description: 'Filter by property name',
    example: '235950',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'If true, returns only properties that are available',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Lower property price per night (inclusive)',
    example: 150,
  })
  @IsNumber()
  @IsOptional()
  pricePerNightFrom: number;

  @ApiPropertyOptional({
    description: 'Higher property price per night (exclusive)',
    example: 150,
  })
  @IsNumber()
  @IsOptional()
  pricePerNightTo: number;

  @ApiPropertyOptional({
    description: 'Filter by city',
    example: '235950',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'Filter by country',
    example: '235950',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: 'Filter by price segment',
    example: '235950',
  })
  @IsString()
  @IsOptional()
  priceSegment?: string;
}
