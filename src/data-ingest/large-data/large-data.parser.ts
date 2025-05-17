import { INormalizedData } from '../common/normalized-data.types';
import { isValidData } from '../common/validate-data';
import { ILargeData } from './large-data.types';

export function normalizeLargeData(
  largeData: ILargeData,
): INormalizedData | undefined {
  const data = {
    id: largeData.id,
    isAvailable: largeData.availability,
    pricePerNight: largeData.pricePerNight,
    city: largeData.city,
    priceSegment: largeData.priceSegment,
  };

  if (isValidData(data)) return data;
}
