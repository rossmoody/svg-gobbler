/**
 * Logs to the console in development and does nothing in production.
 */
interface Logger {
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
