import * as Winston from 'winston';

import * as config from 'config';
import * as expressWinston from 'express-winston';
import { logger } from '../common/logging';

const level = config.get('loglevel');

export function setupLogging(app) {
  // Development Logger
  // const env = server-config.util.getEnv('NODE_ENV');
// error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  if(level === 'info') {
    logger.add(new Winston.transports.Console({
        level: 'debug',
        format: Winston.format.combine(
               Winston.format.colorize(),
               Winston.format.prettyPrint(),
        ),
        handleExceptions: true,
    }))
  }

  setupExpress(app);
};




function setupExpress(app) {
  // error loggin
  if(level === 'debug') {
    app.use(expressWinston.errorLogger({
      transports: [
        new Winston.transports.Console({
          format: Winston.format.combine(
                    Winston.format.colorize(),
                    Winston.format.json()
                  )
        })
      ]
    }));
  }

  // request logging
  if(level === 'info') {
    app.use(expressWinston.logger({
      transports: [
        new Winston.transports.Console({
          format: Winston.format.combine(
                    Winston.format.colorize(),
                    Winston.format.json()
                  )
        })
      ]
    }));
  }
};
