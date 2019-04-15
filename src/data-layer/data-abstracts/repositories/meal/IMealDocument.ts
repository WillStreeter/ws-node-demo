import { Document, Types } from 'mongoose';

export interface IMealDocument extends Document {
  id: string;
  food: string;
  createdAt: Date;
  modifiedAt: Date;
}
