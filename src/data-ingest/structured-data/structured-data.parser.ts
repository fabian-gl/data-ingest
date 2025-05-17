import { INormalizedData } from '../common/normalized-data.types';
import { IStructuredData } from './structured-data.types';

export function normalizeStructuredData(
  structuredData: IStructuredData,
): INormalizedData {
  return {
    id: `${structuredData.id}`,
    name: structuredData.name,
    isAvailable: structuredData.isAvailable,
    pricePerNight: structuredData.priceForNight,
    city: structuredData.address.city,
    country: structuredData.address.country,
  };
}
