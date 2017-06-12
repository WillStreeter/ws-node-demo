
import * as config from 'config';

import { ExpressConfig } from './middleware/server-config/Express';
import   http = require('http');
import { logger } from './middleware/common/logging';


import './service-layer/controllers/AuthorizationController';
import './service-layer/controllers/UsersController';
import {RegisterRoutes} from './middleware/server-config/routes';

import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';

import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as health from 'express-ping';

import './types';


let server:any;
var nodeFrameWork = new ExpressConfig();
const port = config.get('express.port');

const debugPort = config.get('express.debug');
nodeFrameWork.app.use('/docs', nodeFrameWork.static(__dirname + '/swagger-ui'));
nodeFrameWork.app.use('/swagger.json', (req, res) => {
    res.sendfile('./dist/swagger.json');
});
nodeFrameWork.app.use(cors());
nodeFrameWork.app.use(bodyParser.urlencoded({ extended: true }));
nodeFrameWork.app.use(bodyParser.json());
nodeFrameWork.app.use(cookieParser());
nodeFrameWork.app.use(methodOverride());
nodeFrameWork.app.use(health.ping());



RegisterRoutes(nodeFrameWork.app);

function clientErrorHandler (err, req, res, next) {
  if (err.hasOwnProperty('thrown') && err.thrown) {
      res.status(err.status).send({ error: err.message})
  } else {
      next(err)
  }
}

nodeFrameWork.app.use(clientErrorHandler);

this.server = nodeFrameWork.app.listen(port, () => {

const expressHost =  this.server.address();
const expressPort =  this.server.address().port;
  logger.info(`
    ------------
    Server Started!
    Express: http://${expressHost}:${expressPort}
    Debugger: http:/${expressHost}:${expressPort}/?ws=${expressHost}:${expressPort}&port=${debugPort}
    
    
    Health: http://${expressHost}:${expressPort}/ping
    Swagger Docs: http://${expressHost}:${expressPort}/docs
    Swagger Spec: http://${expressHost}:${expressPort}/api-docs
    ------------
  `);
});
