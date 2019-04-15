import { Route, Response, Get, Post, Put, Header, Body, Security, Controller, Path } from 'tsoa';
import {IAnimalCreateRequest, IUserUpdateRequest} from '../request/index';
import {IMessageResponse, IAnimalResponse} from '../responses/index';

import { AnimalDataAgent } from '../../data-layer/data-agents/AnimalDataAgent';
import { AnimalModel } from '../../data-layer/models/AnimalModel';

import { logger } from '../../middleware/common/logging';
import {UserModel} from '../../data-layer/models/UserModel';
import {IAnimalUpdateRequest} from '../request/IAnimalUpdateRequest';


@Route('Animals')
export class AnimalController extends Controller{
    animalDataAgent:AnimalDataAgent = new AnimalDataAgent();
    @Post()
    public async RegisterNewAnimal(@Body()  request: IAnimalCreateRequest): Promise<IAnimalResponse> {
       let result = await this.animalDataAgent.createNewAnimal(request);
       if(result.id){
        return <IAnimalResponse>(result);
       }else{

          throw result;

       }
    }


    @Put()
    public async Update(@Body() request: IAnimalUpdateRequest ): Promise<IAnimalResponse> {
        let result = await this.animalDataAgent.updateAnimal(request);
        if(result.id){
               return <IAnimalResponse>(result);
        }else{
          throw result
        }
    }


}
