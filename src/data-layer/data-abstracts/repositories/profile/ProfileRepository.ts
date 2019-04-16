
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { ProfileSchema } from './ProfileSchema';
import { IProfileDocument} from './IProfileDocument';

export type ProfileMod = Model<IProfileDocument>;

export const ProfileRepo:ProfileMod = MongooseAccess.mongooseConnection.model<IProfileDocument>("profile", ProfileSchema);

