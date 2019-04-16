import { Document, Types } from 'mongoose';
import {IUserDocument} from '../user';

export interface IProfileDocument extends Document {
  id: string;
  user?:IUserDocument;
  zooKeeper: boolean;
  createdAt: Date;
  modifiedAt: Date;

}
