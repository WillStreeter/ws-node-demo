import { Route, Post, Put, Header, Body, Controller, Path } from 'tsoa';
import { IMealCreateRequest } from '../request/index';
import {IMealResponse} from '../responses/index';

import { MealDataAgent } from '../../data-layer/data-agents/MealDataAgent';

import { logger } from '../../middleware/common/logging';


@Route('Meals')
export class MealController extends Controller{
    mealDataAgent:MealDataAgent = new MealDataAgent();
    @Post()
    public async RegisterNewMeal(@Body()  request: IMealCreateRequest): Promise<IMealResponse> {
       let result = await this.mealDataAgent.createNewMeal(request);
       if(result.id){
        return <IMealResponse>(result);
       }else{

          throw result;

       }
    }
}
