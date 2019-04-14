
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Model } from "mongoose";
import { AnimalSchema } from './AnimalSchema';
import { IAnimalDocument} from './IAnimalDocument';

export type AnimalMod = Model<IAnimalDocument>;

export const AnimalRepo:AnimalMod = MongooseAccess.mongooseConnection.model<IAnimalDocument>("animal", AnimalSchema);

