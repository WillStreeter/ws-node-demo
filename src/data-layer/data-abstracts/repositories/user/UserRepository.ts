
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { UserSchema } from './UserSchema';
import { IUserDocument} from './IUserDocument';

export type UserMod = Model<IUserDocument>;

export const UserRepo:UserMod = MongooseAccess.mongooseConnection.model<IUserDocument>("user", UserSchema);

