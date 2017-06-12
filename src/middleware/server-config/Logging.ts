
import * as winston from 'winston';
import * as config from 'config';
import * as expressWinston from 'express-winston';
import { logger } from '../common/logging';

const level = config.get('loglevel');

export function setupLogging(app) {
  // Development Logger
  // const env = server-config.util.getEnv('NODE_ENV');
// error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  if(level === 'info') {
    logger.add(winston.transports.Console, {
      type: 'debug',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    });
  }

  setupExpress(app);
};




function setupExpress(app) {
  // error logging
  if(level === 'debug') {
    app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));
  }

  // request logging
  if(level === 'info') {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));
  }
};
