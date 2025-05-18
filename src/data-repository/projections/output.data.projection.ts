import { ProjectionType } from 'mongoose';
import { NormalizedData } from 'src/persistance/schemas/normalized-data.schema';

export const outDataProjection: ProjectionType<NormalizedData> = {
  _id: false,
  id: true,
  city: true,
  country: true,
  isAvailable: true,
  name: true,
  pricePerNight: true,
  priceSegment: true,
};
