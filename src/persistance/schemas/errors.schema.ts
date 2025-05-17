import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class ProcessError {
  @Prop({ type: Object })
  data: object;

  @Prop({ required: true, index: true })
  filePath: string;

  @Prop({ required: true, index: true })
  fileName: string;

  @Prop({ index: true })
  createdAt: Date;
}

export const ProcessErrorSchema = SchemaFactory.createForClass(ProcessError);
