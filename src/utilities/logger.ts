/**
 * A proverbial logger that logs to the console in development mode and does nothing in production mode.
 */
type Logger = {
  error: (...message: unknown[]) => void
  info: (...message: unknown[]) => void
  table: (message: unknown) => void
}

const developmentLogger: Logger = {
  error: console.error,
  info: console.info,
  table: console.table,
}

const productionLogger: Logger = {
  error: console.error,
  info: () => {},
  table: () => {},
}

export const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger
