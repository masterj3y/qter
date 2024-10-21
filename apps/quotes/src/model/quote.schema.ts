import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class QuoteDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  author: string;

  @Prop()
  text: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  userId: string;
}

export const QuoteSchema = SchemaFactory.createForClass(QuoteDocument);
