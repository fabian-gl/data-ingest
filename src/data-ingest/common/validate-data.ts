import { INormalizedData } from './normalized-data.types';

export function isValidData(data: INormalizedData) {
  if (!data.id) return false;
  if (typeof data?.isAvailable !== 'boolean') return false;
  if (typeof data?.pricePerNight !== 'number') return false;

  return true;
}
