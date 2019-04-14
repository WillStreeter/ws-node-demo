
import mongoose = require('mongoose');
import { IMealDocument, MealRepo} from '../data-abstracts/repositories/meal/index';
import { logger } from '../../middleware/common/logging';


export class MealDataAgent{


  async createNewMeal(meal:any):Promise<any> {

      let newMeal = <IMealDocument>(meal);
      let previouseMeal =  await MealRepo.findOne({ food : newMeal.food});
      if(previouseMeal){
         return  {thrown:true, success:false, status:409,  message: "this meal is already in use"};
      }
      let newMealResult =  await MealRepo.create(newMeal);
      if(newMealResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newMealResult;
  }


  async getByMealFood(food:string):Promise<any> {
      let authMeal =  await MealRepo.findOne({ food : food});

      if(!authMeal){
            return  {thrown:true, status:404,  message: "animal specie does not exit"};
      }
      return authMeal;
  }

  async getMealById( mealId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(mealId)){
            return  {status:401,  message: "incorrect meal id"};
      }
      let result = await MealRepo.findById(mealId);
      return result;
  }


}
