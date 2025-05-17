import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NormalizedDataDocument = HydratedDocument<NormalizedData>;

@Schema({ timestamps: true })
export class NormalizedData {
  @Prop({ required: true, index: true, unique: true })
  id: string;

  @Prop({ text: true }) // Validate if text search is good for this attribute
  name?: string;

  @Prop({ required: true, index: true })
  isAvailable: boolean;

  @Prop({ required: true, index: true })
  pricePerNight: number;

  @Prop({ required: true, index: true })
  city: string;

  @Prop({ index: true })
  country?: string;

  @Prop({ index: true })
  priceSegment?: string;

  @Prop({ index: true })
  bucketName: string;

  @Prop({ index: true })
  fileName: string;
}

export const NormalizedDataSchema =
  SchemaFactory.createForClass(NormalizedData);
