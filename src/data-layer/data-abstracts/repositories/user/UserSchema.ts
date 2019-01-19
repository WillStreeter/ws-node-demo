
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Schema } from "mongoose";
import * as Bcrypt from "bcrypt-nodejs"
import { IUserDocument} from './IUserDocument';



const SALT_WORK_FACTOR = 10;


/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let UserSchema:Schema = new Schema({
  username:  {
                type: String,
                  trim: true,
                  required: true,
                  index: {unique: true, dropDups: true}
             },

  password:  {
                type: String,
                required: true
             },

  firstname: {
                type: String,
                required: true
             },

  lastname:  {
                type: String,
                required: true
             },

  email:     {
               type: String,
               required: true,
             },

  admin:      Boolean,

  isLoggedIn: Boolean,

  createdAt: {
	   type: Date,
	   default : Date.now
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now
  }

})



UserSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IUserDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

        if (!this.isModified("password")) {
          return next();
        }

        doc.password = Bcrypt.hashSync(doc.password, Bcrypt.genSaltSync(SALT_WORK_FACTOR));
      }

      next();
});



UserSchema.method('comparePassword', _comparePassword)


async function _comparePassword(candidatePassword:string, user): Promise<any> {
   let  isMatch = await Bcrypt.compareSync(candidatePassword, user.password);
   return isMatch
};


export { UserSchema };
