import { INormalizedData } from '../common/normalized-data.types';
import { isValidData } from '../common/validate-data';
import { IStructuredData } from './structured-data.types';

export function normalizeStructuredData(
  structuredData: IStructuredData,
): INormalizedData | undefined {
  const data = {
    id: `${structuredData.id}`,
    name: structuredData.name,
    isAvailable: structuredData.isAvailable,
    pricePerNight: structuredData.priceForNight,
    city: structuredData.address.city,
    country: structuredData.address.country,
  };

  if (isValidData(data)) return data;
}
