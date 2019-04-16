import { Route, Response, Get, Post, Put, Header, Body, Security, Controller, Path } from 'tsoa';
import { IProfileCreateRequest} from '../request/index';
import {IMessageResponse, IProfileResponse, IUserResponse} from '../responses/index';

import { ProfileDataAgent } from '../../data-layer/data-agents/ProfileDataAgent';
import { ProfileModel } from '../../data-layer/models/ProfileModel';

import { logger } from '../../middleware/common/logging';
import {UserModel} from '../../data-layer/models/UserModel';


@Route('Profile')
export class ProfileController extends Controller{
    profileDataAgent:ProfileDataAgent = new ProfileDataAgent();
    @Post()
    public async RegisterNewProfile(@Body()  request: IProfileCreateRequest): Promise<IProfileResponse> {

        console.log('[---- ProfileController --IProfileCreateRequest- request =', request)
       let result = await this.profileDataAgent.createNewProfile(request);

       if(result.id){
        console.log('[---- ProfileController --- result =', result)
        return <IProfileResponse>(result);
       }else{

          throw result;

       }
    }


    @Get('{profileId}')
    public async GetProfileById(profileId: string ): Promise<IProfileResponse> {
       let result = await this.profileDataAgent.getProfileById(profileId);
       if( result && result.user){
               return <IProfileResponse>(result);
       }else{
          if(result){
              throw result;
          }else{

              throw{
                   thrown:true,
                   status: 404,
                   message: 'no such profile exist'
              }

          }
       }
    }

}
