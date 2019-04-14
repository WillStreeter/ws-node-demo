import { Schema } from "mongoose";
import { IAnimalDocument } from './IAnimalDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */

 const AnimalSchema:Schema = new Schema({

  specie:{
        type: String,
  },

  createdAt: {
	   type: Date,
	   default : Date.now()
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now()
  }

});



AnimalSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IAnimalDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export {AnimalSchema };
