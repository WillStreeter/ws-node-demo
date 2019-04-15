import {IMealResponse} from './IMealResponse';

export interface IAnimalResponse{
  id?:string;
  specie?: string;
  meals?: IMealResponse[]
}
