// This interface shows the normalized version of the data that may arrive to us

export interface INormalizedData {
  id: string;
  name?: string;
  isAvailable: boolean;
  pricePerNight: number;
  city: string;
  country?: string;
  priceSegment?: string;
}
