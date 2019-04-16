import mongoose = require('mongoose');
import { IProfileDocument, ProfileRepo} from '../data-abstracts/repositories/profile/index';
import { logger } from '../../middleware/common/logging';


export class ProfileDataAgent{


  async createNewProfile(profile:any):Promise<any> {

      let newProfile = <IProfileDocument>(profile);
      let previousProfile =  await ProfileRepo.findOne({ user : profile.user});
      if(previousProfile){
         return  {thrown:true, success:false, status:409,  message: "this Profile is already in use"};
      }
      let newProfileResult =  await ProfileRepo.create(newProfile);
      if(newProfileResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newProfileResult;
  }



  async getProfileById( profileId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(profileId)){
            return  {status:401,  message: "incorrect meal id"};
      }
      let result = await ProfileRepo.findById(profileId)
          .populate('user')
          .populate({ path:'user',
                populate:{ path:'animals', populate:{ path:'meals'}} });
      return result;
  }


}
