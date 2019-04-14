
import mongoose = require('mongoose');
import { IAnimalDocument, AnimalRepo} from '../data-abstracts/repositories/animal/index';
import { logger } from '../../middleware/common/logging';


export class AnimalDataAgent{


  async createNewAnimal(animal:any):Promise<any> {

      let newAnimal = <IAnimalDocument>(animal);
      let previouseAnimal =  await AnimalRepo.findOne({ specie : newAnimal.specie});
      if(previouseAnimal){
         return  {thrown:true, success:false, status:409,  message: "animal species is already in use"};
      }
      let newAnimalResult =  await AnimalRepo.create(newAnimal);
      if(newAnimalResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newAnimalResult;
  }


  async getByAnimalSpecie(specie:string):Promise<any> {
      let authAnimal =  await AnimalRepo.findOne({ specie : specie});

      if(!authAnimal){
            return  {thrown:true, status:404,  message: "animal specie does not exit"};
      }
      return authAnimal;
  }

  async getAnimalById( animalId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(animalId)){
            return  {status:401,  message: "incorrect animal id"};
      }
      let result = await AnimalRepo.findById(animalId);
      return result;
  }



  async updateAnimal(animal:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(animal.id)){
            return  {thrown:true, status:401,  message: "incorrect animal id"};
      }
      let resultAnimalById = await AnimalRepo.findById(animal.id);
      if(resultAnimalById){
         return  {thrown:true, status:409,  message: "this animal does not exist"};
      }
      let savedResult = await animal.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;

  }

}
