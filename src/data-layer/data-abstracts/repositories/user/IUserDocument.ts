import { Document, Types } from 'mongoose';
import { IAnimalDocument} from '../animal';

export interface IUserDocument extends Document {

  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
  animals?: Types.DocumentArray<IAnimalDocument>
  isLoggedIn: boolean;
  createdAt: Date;
  modifiedAt: Date;

}
