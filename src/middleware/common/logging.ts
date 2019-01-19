import * as Winston from 'winston';

export const logger = Winston.createLogger()

process.on('unhandledRejection', function (reason, p) {
  logger.warn('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
