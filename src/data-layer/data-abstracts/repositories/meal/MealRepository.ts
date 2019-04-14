
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { MealSchema } from './MealSchema';
import { IMealDocument} from './IMealDocument';

export type MealMod = Model<IMealDocument>;

export const MealRepo:MealMod = MongooseAccess.mongooseConnection.model<IMealDocument>("meal", MealSchema);

