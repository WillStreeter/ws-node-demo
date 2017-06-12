import { IsEmail, Length ,IsAlphanumeric, IsAlpha} from "class-validator";


export class UserValidationSchema  {

     @Length(5, 15)
     @IsAlphanumeric()
     username: string;


     @Length(2, 15)
     password: string;


     @Length(2, 15)
     @IsAlpha()
     firstname: string;


     @Length(2, 15)
     @IsAlpha()
     lastname: string;

     @IsEmail()
     email: string;

    constructor(userInfo:any){
       this.username = userInfo.username;
       this.password = userInfo.password;
       this.firstname = userInfo.firstname;
       this.lastname= userInfo.lastname;
       this.email= userInfo.email;

    }
}
