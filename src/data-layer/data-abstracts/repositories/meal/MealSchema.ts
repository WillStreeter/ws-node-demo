import { Schema } from "mongoose";
import { IMealDocument } from './IMealDocument';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */

 const MealSchema:Schema = new Schema({

  food:{
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



MealSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <IMealDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export {MealSchema };
