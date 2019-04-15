import { Document, Types } from 'mongoose';
import {IMealDocument} from '../meal';


export interface IAnimalDocument extends Document {

  id: string;
  specie: string;
  meals?: Types.DocumentArray<IMealDocument>;
  createdAt: Date;
  modifiedAt: Date;
}
