/**
 * A proverbial logger that logs to the console in development mode and does nothing in production mode.
 */
type Logger = {
  info: (message: unknown) => void
  error: (message: unknown) => void
  table: (message: unknown) => void
}

const developmentLogger: Logger = {
  info: console.info,
  error: console.error,
  table: console.table,
}

const productionLogger: Logger = {
  info: () => {},
  error: console.error,
  table: () => {},
}

export const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger
