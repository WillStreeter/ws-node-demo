import {IMealDocument} from '../../data-layer/data-abstracts/repositories/meal';

export interface IAnimalResponse{
  id?:string;
  specie?: string;
  meals?: IMealDocument[]
}
