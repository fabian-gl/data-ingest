import { INormalizedData } from '../common/normalized-data.types';
import { ILargeData } from './large-data.types';

export function normalizeLargeData(largeData: ILargeData): INormalizedData {
  return {
    id: largeData.id,
    isAvailable: largeData.availability,
    pricePerNight: largeData.pricePerNight,
    city: largeData.city,
    priceSegment: largeData.priceSegment,
  };
}
