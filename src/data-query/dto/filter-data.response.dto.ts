import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DataElementResponseDto {
  @ApiProperty({
    description: 'Property id',
    example: '235950',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Property name',
    example: 'Beachside Bungalow',
  })
  name?: string;

  @ApiProperty({
    description: 'If the property is available or not',
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Price per night',
    example: 150,
  })
  pricePerNight: number;

  @ApiProperty({
    description: 'Property city',
    example: 'Buenos Aires',
  })
  city: string;

  @ApiProperty({
    description: 'Property country',
    example: 'Argentina',
  })
  country?: string;

  @ApiProperty({
    description: 'Property price segment',
    example: 'high',
  })
  priceSegment?: string;
}

export class FilterDataResponseDto {
  @ApiProperty({
    description: 'List of properties',
    type: [DataElementResponseDto],
  })
  data: DataElementResponseDto[];

  @ApiProperty({
    example: 15,
    description: 'Total number of items',
  })
  total: number;

  @ApiProperty({
    example: 20,
    description: 'Number of items per page',
  })
  limit: number;

  @ApiProperty({
    example: 0,
    description: 'Offset',
  })
  offset: number;
}
