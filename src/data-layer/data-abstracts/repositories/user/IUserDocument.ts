import mongoose = require('mongoose');

export interface IUserDocument extends mongoose.Document {

  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
  isLoggedIn: boolean;
  createdAt: Date;
  modifiedAt: Date;
}
