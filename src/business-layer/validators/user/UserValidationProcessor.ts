import { validate } from "class-validator";
import { UserValidationSchema } from './UserValidationSchema';
import { forEach, pick} from 'lodash';

async function validateUserRegistration(userReqObj:any): Promise<any>{
       let validUserRegData = new UserValidationSchema(userReqObj);
       var regex = new RegExp('^[A-Za-z0-9$]+$');
       let validationResults =  await validate(validUserRegData);
       const badPW = regex.test(userReqObj.password);
       let constraints =[]
       if(validationResults &&  validationResults.length > 0 || !badPW){
              if(!badPW){
                constraints.push({constraints: {isAlphanumeric: "password must contain only letters and numbers and $" },
                                  property:"password" });
              }
             forEach(validationResults, (item)=>{
                 constraints.push(pick(item, 'constraints', 'property'));
             });
       }
       return constraints;
}



export {validateUserRegistration}