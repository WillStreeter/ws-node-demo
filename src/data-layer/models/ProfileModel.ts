import { IProfileDocument} from '../data-abstracts/repositories/profile';
import { IUserResponse } from '../../service-layer/responses';


export class ProfileModel{
    private _profileModel:IProfileDocument;

    constructor(iProfileDocument:IProfileDocument){
        this._profileModel = iProfileDocument;
    }

    get id(): string{
      return (this._profileModel.id).toString();
    }

    get zooKeeper(): boolean{
        return this._profileModel.zooKeeper
    }

    get  user(): IUserResponse{
        return this._profileModel.user
    }


    get createdAt(): Date {
        return this._profileModel.createdAt;
    }

    get modifiedAt(): Date {
       return this._profileModel.modifiedAt;
    }
}
