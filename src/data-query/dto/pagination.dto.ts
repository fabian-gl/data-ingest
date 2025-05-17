import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Number of results to return',
    example: 10,
    default: 20,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  limit: number = 20;

  @ApiPropertyOptional({
    description: 'Number of elements to skip',
    example: 200,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;
}
