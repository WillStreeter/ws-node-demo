import "reflect-metadata";
import * as express from 'express';


import { setupLogging } from './Logging';

export class ExpressConfig {

  app: express.Express;
  static:any;


  constructor() {
    this.app = express();
    this.static = express.static;
    setupLogging(this.app);
  }


}

