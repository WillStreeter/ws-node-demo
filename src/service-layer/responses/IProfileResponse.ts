import {IUserResponse} from './IUserResponse';

export interface IProfileResponse{
  id?:string;
  zooKeeper?: boolean;
  user?:IUserResponse;
}
