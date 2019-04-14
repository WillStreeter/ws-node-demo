import mongoose = require('mongoose');

export interface IMealDocument extends mongoose.Document {

  id: string;
  food: string;
  createdAt: Date;
  modifiedAt: Date;
}
