
import { MongooseAccess } from '../../../adapters/MongooseAccess';
import { Schema } from "mongoose";
import {IProfileDocument} from './IProfileDocument';


/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let ProfileSchema:Schema = new Schema({
  zooKeeper:{
	   type: Boolean,
	   default : false
  },
  user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        },

  createdAt: {
	   type: Date,
	   default : Date.now
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now
  }

})



ProfileSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IProfileDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;
      }

      next();
});



export { ProfileSchema };
